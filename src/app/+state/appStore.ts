import { ActionReducerMap } from '@ngrx/store';
import { teamReducers, TeamState } from './team/team.reducer';

export interface AppStore {
    team: TeamState;
}

export const reducers: ActionReducerMap<AppStore> = {
    team: teamReducers,
};
