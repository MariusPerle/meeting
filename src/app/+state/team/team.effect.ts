import { inject, Injectable } from '@angular/core';
import { createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { addTeamMember, loadTeam, removeTeamMember } from './team.actions';
import { ActionsSubject, Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs';
import { AppStore } from '../appStore';
import {
    loadTeamFromLocalStorage,
    saveToLocalStorage,
} from './utils/team.utils';

@Injectable()
export class TeamEffect implements OnInitEffects {
    private readonly actions$ = inject(ActionsSubject);
    private readonly store: Store<AppStore> = inject(Store);

    savingEffect = createEffect(
        () =>
            this.actions$.pipe(
                ofType(addTeamMember, removeTeamMember),
                withLatestFrom(this.store),
                tap(([_, state]) => {
                    saveToLocalStorage(state.team.members);
                }),
            ),
        { dispatch: false },
    );

    ngrxOnInitEffects() {
        return loadTeam({ members: loadTeamFromLocalStorage() });
    }
}
