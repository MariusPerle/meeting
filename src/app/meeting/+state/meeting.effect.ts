import { inject, Injectable } from '@angular/core';
import { createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { tap, withLatestFrom } from 'rxjs';
import {
    clearRecords,
    loadRecords,
    removeRecord,
    saveRecord,
} from './meeting.actions';
import {
    loadMeetingsFromLocalStorage,
    saveToLocalStorage,
} from './utils/meeting.utils';
import { MeetingStore } from './meeting.reducer';

@Injectable()
export class MeetingEffect implements OnInitEffects {
    private readonly actions$ = inject(ActionsSubject);
    private readonly store: Store<MeetingStore> = inject(Store);

    savingEffect = createEffect(
        () =>
            this.actions$.pipe(
                ofType(saveRecord, removeRecord, clearRecords),
                withLatestFrom(this.store),
                tap(([_, state]) => {
                    console.log(state);
                    console.log(state.meeting);
                    saveToLocalStorage(state.meeting.records);
                }),
            ),
        { dispatch: false },
    );

    ngrxOnInitEffects() {
        return loadRecords({ meetings: loadMeetingsFromLocalStorage() });
    }
}
