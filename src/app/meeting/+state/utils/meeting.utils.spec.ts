import { mockLocalStorage } from '../../../../test/local-storage-mock';
import {
    meetingsStoreKey,
    loadMeetingsFromLocalStorage,
    saveToLocalStorage,
} from './meeting.utils';
import { Record } from './meeting.interface';
import { recordFactory } from './meeting-mock';

describe('NotesService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('load from local storage', () => {
        beforeEach(() => {
            mockLocalStorage();
        });

        it('should load nothing from local storage', () => {
            expect(loadMeetingsFromLocalStorage()).toEqual([]);
            const meetings = [
                {
                    ...recordFactory({ id: '1' }),
                    date: 'no date',
                },
            ];
            localStorage.setItem(meetingsStoreKey, JSON.stringify(meetings));
            expect(loadMeetingsFromLocalStorage()).toEqual([]);
        });

        it('should load team from local storage', () => {
            const meetings: Record[] = [recordFactory({ id: '1' })];
            localStorage.setItem(meetingsStoreKey, JSON.stringify(meetings));
            expect(loadMeetingsFromLocalStorage()).toEqual(meetings);
        });
    });

    describe('save changes', () => {
        const exampleTeam: Record[] = [
            recordFactory({ id: '1', name: 'init' }),
        ];

        beforeEach(() => {
            localStorage.setItem(meetingsStoreKey, JSON.stringify(exampleTeam));
            mockLocalStorage();
        });

        it('any changes should be saved', () => {
            const newTeam = [recordFactory({ id: '2', name: 'change' })];
            saveToLocalStorage(newTeam);
            expect(localStorage.getItem(meetingsStoreKey)).toEqual(
                JSON.stringify(newTeam),
            );
        });
    });
});
