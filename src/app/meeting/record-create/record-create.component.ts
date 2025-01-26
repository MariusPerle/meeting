import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { selectMembers } from '../../+state/team/team.selectors';
import { TeamMember } from '../../+state/team/utils/team.interface';
import { interval, map, Observable, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStore } from '../../+state/appStore';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { saveRecord } from '../+state/meeting.actions';
import { RecordMember } from '../+state/utils/meeting.interface';

@Component({
    selector: 'meeting-recording-meeting',
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './record-create.component.html',
    styleUrl: './record-create.component.scss',
})
export class RecordCreateComponent implements OnInit {
    private readonly store: Store<AppStore> = inject(Store);
    private readonly destroyRef = inject(DestroyRef);
    private router = inject(Router);

    team = this.store.selectSignal(selectMembers);
    title = new FormControl('', {
        nonNullable: true,
        validators: Validators.required,
    });
    meetingInfo: {
        [key: string]: FormGroup<{
            time: FormControl<number>;
            note: FormControl<string>;
            attended: FormControl<boolean>;
            participated: FormControl<boolean>;
        }>;
    } = {};
    activeMember?: TeamMember;
    startSpeakingTime = 0;

    timer?: Observable<string>;
    meetingInProgress = false;
    endTimer = new Subject<void>();

    ngOnInit(): void {
        this.team().forEach((member) => {
            this.meetingInfo[member.id] = new FormGroup({
                time: new FormControl(0, { nonNullable: true }),
                note: new FormControl('', { nonNullable: true }),
                attended: new FormControl(true, {
                    nonNullable: true,
                }),
                participated: new FormControl(false, {
                    nonNullable: true,
                }),
            });
        });
    }

    /**
     * set up timer to display current time mark mark current meeting as in progress
     */
    startMeeting() {
        if (this.timer) {
            return;
        }
        this.endTimer.next();
        this.meetingInProgress = true;
        this.timer = interval(1000).pipe(
            takeUntil(this.endTimer),
            takeUntilDestroyed(this.destroyRef),
            map((sec_num: number) =>
                new Date(sec_num * 1000 + 1000).toISOString().slice(11, 19),
            ),
        );
    }

    resetMeeting() {
        this.timer = undefined;
        Object.keys(this.meetingInfo).forEach((key) => {
            this.meetingInfo[key].reset();
        });
        this.title.reset();
    }

    /**
     * adds current time to active member
     */
    updateTime() {
        if (this.activeMember) {
            this.meetingInfo[this.activeMember.id].patchValue({
                time:
                    (this.meetingInfo[this.activeMember.id].value.time ?? 0) +
                    new Date().getTime() -
                    this.startSpeakingTime,
            });
        }
    }

    selectMember(member: TeamMember) {
        // start timer for display purposes
        this.startMeeting();

        this.updateTime();
        this.meetingInfo[member.id].patchValue({
            participated: true,
            attended: true,
        });

        // stop active member from being active
        if (this.activeMember?.id === member.id) {
            this.activeMember = undefined;
            this.startSpeakingTime = 0;
            return;
        }

        this.activeMember = member;
        this.startSpeakingTime = new Date().getTime();
    }

    endMeeting() {
        this.updateTime();

        this.activeMember = undefined;
        this.meetingInProgress = false;
        // end timer
        if (this.timer) {
            this.endTimer.next();
        }
    }

    saveMeeting() {
        const meetingMembers = this.team()
            .map((member) => {
                const meetingInfo = this.meetingInfo[member.id].value;
                if (!meetingInfo || !meetingInfo.attended) return undefined;
                const update: RecordMember = {
                    id: member.id,
                    time: meetingInfo.time ?? 0,
                    note: meetingInfo.note ?? '',
                    attended: meetingInfo.attended ?? false,
                    participated: meetingInfo.participated ?? false,
                };
                return update;
            })
            .filter((entry) => entry !== undefined) as RecordMember[];

        this.store.dispatch(
            saveRecord({
                meeting: { members: meetingMembers, name: this.title.value },
            }),
        );
        this.resetMeeting();
    }

    goBack(leaveMeetingDialog: HTMLDialogElement) {
        if (!this.meetingInProgress) {
            this.router.navigate(['/']);
        }
        leaveMeetingDialog.showModal();
    }
}
