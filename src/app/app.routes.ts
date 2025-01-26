import { Route } from '@angular/router';
import { TeamComponent } from './team/team.component';
import { MeetingComponent } from './meeting/meeting.component';
import { StoreModule } from '@ngrx/store';
import { importProvidersFrom } from '@angular/core';
import { featureConfig } from './meeting/+state/meeting.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MeetingEffect } from './meeting/+state/meeting.effect';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'team',
        pathMatch: 'full',
    },
    {
        path: 'team',
        component: TeamComponent,
    },
    {
        path: 'meeting',
        component: MeetingComponent,
        loadChildren: () =>
            import('./meeting/meeting.routes').then((r) => r.meetingRoutes),
        providers: [
            importProvidersFrom([
                StoreModule.forFeature(featureConfig),
                EffectsModule.forFeature(MeetingEffect),
            ]),
        ],
    },
    {
        path: '**',
        redirectTo: 'team',
    },
];
