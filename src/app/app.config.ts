import {
    ApplicationConfig,
    importProvidersFrom,
    isDevMode,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { TeamEffect } from './+state/team/team.effect';
import { environment } from '../environments/environment';
import { reducers } from './+state/appStore';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(
            RouterModule.forRoot(appRoutes),

            // configure NgRx modules
            StoreModule.forRoot(reducers),
            !environment.production
                ? StoreDevtoolsModule.instrument({ connectInZone: true })
                : [],
            EffectsModule.forRoot([TeamEffect]),
        ),
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000',
        }), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          }),
    ],
};
