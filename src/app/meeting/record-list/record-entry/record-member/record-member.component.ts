import { Component, inject, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordMember } from '../../../+state/utils/meeting.interface';
import { Store } from '@ngrx/store';
import { MeetingStore } from '../../../+state/meeting.reducer';
import { selectMember } from '../../../../+state/team/team.selectors';
import { map, Observable } from 'rxjs';

@Component({
    selector: 'daily-record-member',
    imports: [CommonModule],
    templateUrl: './record-member.component.html',
    styleUrl: './record-member.component.scss',
})
export class RecordMemberComponent implements OnInit {
    recordMember = input.required<RecordMember>();
    even = input.required<boolean>();
    private readonly store: Store<MeetingStore> = inject(Store);

    name$!: Observable<string>;

    get status() {
        return !this.recordMember().attended
            ? 'absent'
            : this.recordMember().participated
              ? 'participated'
              : 'attended';
    }

    ngOnInit(): void {
        this.name$ = this.store
            .select(selectMember(this.recordMember().id))
            .pipe(map((member) => member?.name ?? 'no name'));
    }
}
