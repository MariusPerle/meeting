import { createReducer, on } from '@ngrx/store';
import {
    addTeamMember,
    loadTeam,
    randomSelection,
    removeTeamMember,
} from './team.actions';
import { RandomMember, TeamMember } from './utils/team.interface';

export interface TeamState {
    members: TeamMember[];
    randomMembers: RandomMember[];
}

const initialTeamState: TeamState = {
    members: [],
    randomMembers: [],
};

export const teamReducers = createReducer(
    initialTeamState,
    on(loadTeam, (state, { members }) => ({ ...state, members })),
    on(addTeamMember, (state, { name }) => {
        return {
            ...state,
            members: [
                ...state.members,
                { name, id: Math.random().toString(), history: [] },
            ],
        };
    }),
    on(removeTeamMember, (state, { id }) => {
        return {
            ...state,
            members: state.members.filter((member) => member.id !== id),
        };
    }),
    on(randomSelection, (state, { amount }) => {
        let members = state.members;
        const randomMembers: TeamMember[] = [];
        for (let i = 0; i < amount && members.length; i++) {
            const randomIndex = Math.floor(Math.random() * members.length);
            randomMembers.push(members[randomIndex]);
            members = members.filter(
                (member) => member !== members[randomIndex],
            );
        }
        return {
            ...state,
            randomMembers: randomMembers.map(({ id }) => ({ id })),
        };
    }),
);
