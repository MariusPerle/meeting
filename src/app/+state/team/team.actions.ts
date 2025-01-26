import { createAction, props } from '@ngrx/store';
import { TeamMember } from './utils/team.interface';

export const loadTeam = createAction(
    '[Team] Load Team',
    props<{ members: TeamMember[] }>(),
);

export const addTeamMember = createAction(
    '[Team] Add Team Member',
    props<{ name: string }>(),
);

export const removeTeamMember = createAction(
    '[Team] Remove Team Member',
    props<{ id: string }>(),
);

export const randomSelection = createAction(
    '[Team] Random Selection',
    props<{ amount: number }>(),
);
