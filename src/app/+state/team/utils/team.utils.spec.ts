import { mockLocalStorage } from '../../../../test/local-storage-mock';
import {
    loadTeamFromLocalStorage,
    saveToLocalStorage,
    teamStoreKey,
} from './team.utils';
import { TeamMember } from './team.interface';
import { teamMemberFactory } from './team-mock';

describe('NotesService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('load from local storage', () => {
        beforeEach(() => {
            mockLocalStorage();
        });

        it('should load nothing from local storage', () => {
            expect(loadTeamFromLocalStorage()).toEqual([]);
        });

        it('should load team from local storage', () => {
            const exampleTeam: TeamMember[] = [teamMemberFactory({ id: '1' })];
            localStorage.setItem(teamStoreKey, JSON.stringify(exampleTeam));
            expect(loadTeamFromLocalStorage()).toEqual(exampleTeam);
        });
    });

    describe('save changes', () => {
        const exampleTeam: TeamMember[] = [
            teamMemberFactory({ id: '1', name: 'init' }),
        ];

        beforeEach(() => {
            localStorage.setItem(teamStoreKey, JSON.stringify(exampleTeam));
            mockLocalStorage();
        });

        it('any changes should be saved', () => {
            const newTeam = [teamMemberFactory({ id: '2', name: 'change' })];
            saveToLocalStorage(newTeam);
            expect(localStorage.getItem(teamStoreKey)).toEqual(
                JSON.stringify(newTeam),
            );
        });
    });
});
