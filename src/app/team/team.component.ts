import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMemberComponent } from './team-member/team-member.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AppService } from '../app.service';
import { TeamStore } from '../+state/team/team.store';

@Component({
    selector: 'meeting-team',
    imports: [
        CommonModule,
        TeamMemberComponent,
        ReactiveFormsModule,
        RouterLink,
    ],
    templateUrl: './team.component.html',
    styleUrl: './team.component.scss',
})
export class TeamComponent implements OnInit {
    private readonly appService = inject(AppService);
    private readonly teamStore = inject(TeamStore);

    team = this.teamStore.selectMembers;
    newMember = new FormGroup({
        name: new FormControl('', { nonNullable: true }),
    });

    ngOnInit(): void {
        this.appService.updateTitle('Team');
    }

    addMember() {
        if (!this.newMember.valid) {
            return;
        }
        this.teamStore.addMember(this.newMember.value.name ?? '');
        this.newMember.reset();
    }
}
