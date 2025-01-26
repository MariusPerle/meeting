import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TeamStore } from '../../+state/team/team.store';

@Component({
    selector: 'meeting-random-team-member',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './random-team-member.component.html',
    styleUrl: './random-team-member.component.scss',
})
export class RandomTeamMemberComponent {
    private readonly teamStore = inject(TeamStore);

    amountControl = new FormControl(1, { nonNullable: true });

    randomMembers() {
        this.teamStore.randomSelection(this.amountControl.value);
    }
}
