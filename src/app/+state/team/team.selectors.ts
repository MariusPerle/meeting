import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector,
} from '@ngrx/store';
import { TeamState } from './team.reducer';
import { TeamMemberWithRandomPosition } from './utils/team.interface';

export const selectTeam = createFeatureSelector<TeamState>('team');
export const selectMembers: MemoizedSelector<
    object,
    TeamMemberWithRandomPosition[]
> = createSelector(selectTeam, (state) =>
    state.members.map((member) => ({
        ...member,
        randomPosition: state.randomMembers.findIndex(
            (randomMember) => randomMember.id === member.id,
        ),
    })),
);
export const selectMember = (id: string) =>
    createSelector(selectMembers, (members) =>
        members.find((member) => member.id === id),
    );
