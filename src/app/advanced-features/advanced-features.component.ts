import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomTeamMemberComponent } from './random-team-member/random-team-member.component';

@Component({
    selector: 'daily-advanced-features',
    imports: [CommonModule, RandomTeamMemberComponent],
    templateUrl: './advanced-features.component.html',
    styleUrl: './advanced-features.component.scss',
})
export class AdvancedFeaturesComponent {
    displayAdvancedFeatures = false;
}
