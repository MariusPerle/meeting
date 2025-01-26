import {
    addTeamMember,
    randomSelection,
    removeTeamMember,
} from './team.actions';
import { teamReducers, TeamState } from './team.reducer';
import { selectMembers } from './team.selectors';
import { MeetingStore } from '../../meeting/+state/meeting.reducer';

function createTeamState(teamState?: Partial<TeamState>): TeamState {
    return {
        members: [],
        randomMembers: [],
        ...teamState,
    };
}

describe('Team Store Test', () => {
    describe('Test Reducers', () => {
        it('add team member', () => {
            const { members } = teamReducers(
                createTeamState({
                    members: [
                        {
                            name: 'Always Here',
                            id: '1',
                        },
                    ],
                }),
                addTeamMember({ name: 'Magic Max' }),
            );
            expect(members.length).toEqual(2);
            expect(
                members.some((member) => member.name === 'Magic Max'),
            ).toBeTruthy();
        });

        it('remove team member', () => {
            const { members } = teamReducers(
                createTeamState({
                    members: [
                        {
                            name: 'Always Here',
                            id: '1',
                        },
                    ],
                }),
                removeTeamMember({ id: '1' }),
            );
            expect(members.length).toEqual(0);
        });

        it('select random members', () => {
            const { randomMembers } = teamReducers(
                createTeamState({
                    members: [
                        {
                            name: 'Always Here',
                            id: '1',
                        },
                        {
                            name: 'Magic Max',
                            id: '2',
                        },
                    ],
                }),
                randomSelection({ amount: 3 }),
            );
            expect(randomMembers.length).toEqual(2);
            expect(randomMembers[0]).toBeTruthy();
            expect(randomMembers[1]).toBeTruthy();
            expect(randomMembers[0]).not.toEqual(randomMembers[1]);
        });
    });

    describe('Test Selectors', () => {
        it('select members', () => {
            const members = [
                {
                    name: 'Always Here',
                    id: '1',
                    history: [],
                },
            ];
            const state: MeetingStore = {
                team: {
                    members,
                    randomMembers: [],
                },
                meeting: {
                    records: [],
                },
            };
            expect(selectMembers(state)).toEqual(
                members.map((member) => ({ ...member, randomPosition: -1 })),
            );
        });

        it('select members & random positions', () => {
            const members = [
                {
                    name: 'Always Here',
                    id: '1',
                    history: [],
                },
                {
                    name: 'Magic Max',
                    id: '2',
                    history: [],
                },
            ];
            const state: MeetingStore = {
                team: {
                    members,
                    randomMembers: [{ id: '2' }, { id: '1' }],
                },
                meeting: {
                    records: [],
                },
            };
            expect(selectMembers(state)).toEqual([
                {
                    name: 'Always Here',
                    id: '1',
                    history: [],
                    randomPosition: 1,
                },
                {
                    name: 'Magic Max',
                    id: '2',
                    history: [],
                    randomPosition: 0,
                },
            ]);
        });
    });
});
