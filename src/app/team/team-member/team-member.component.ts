import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppStore } from '../../+state/appStore';
import { removeTeamMember } from '../../+state/team/team.actions';
import { TeamMember } from '../../+state/team/utils/team.interface';

export interface TeamMemberWithRandomPosition extends TeamMember {
    randomPosition: number;
}

@Component({
    selector: 'daily-team-member',
    imports: [CommonModule],
    templateUrl: './team-member.component.html',
    styleUrl: './team-member.component.scss',
})
export class TeamMemberComponent {
    member = input.required<TeamMemberWithRandomPosition>();
    even = input.required<boolean>();

    constructor(private readonly store: Store<AppStore>) {}

    removeMember() {
        this.store.dispatch(removeTeamMember({ id: this.member().id }));
    }
}
