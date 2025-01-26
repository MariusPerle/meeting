import { historyReducers, MeetingState } from './meeting.reducer';
import {
    clearRecords,
    loadRecords,
    removeRecord,
    saveRecord,
} from './meeting.actions';
import { recordFactory } from './utils/meeting-mock';
import { selectRecords } from './meeting.selectors';

function createMeetingState(
    historyState?: Partial<MeetingState>,
): MeetingState {
    return {
        records: [],
        ...historyState,
    };
}

function createGlobalState(historyState?: Partial<MeetingState>) {
    return {
        meeting: createMeetingState(historyState),
    };
}

describe('Meeting Selectors', () => {
    it('should select records', () => {
        const records = [
            recordFactory({ id: '1' }),
            recordFactory({ id: '2' }),
        ];
        const state = createGlobalState({ records });
        expect(selectRecords(state)).toEqual(records);
    });
});

describe('Meeting Reducer', () => {
    it('should add', () => {
        const state = createMeetingState();
        const action = saveRecord({
            meeting: {
                name: 'Meeting 1',
                members: [],
            },
        });
        const newState = historyReducers(state, action);
        expect(newState.records).toEqual([
            {
                id: expect.any(String),
                date: expect.any(Date),
                name: 'Meeting 1',
                members: [],
            },
        ]);
    });

    it('should remove meeting', () => {
        const state = createMeetingState({
            records: [
                {
                    id: '1',
                    name: 'Meeting 1',
                    date: new Date(),
                    members: [],
                },
            ],
        });
        const action = removeRecord({ id: '1' });
        const newState = historyReducers(state, action);
        expect(newState.records).toEqual([]);
    });

    it('should clear record-list', () => {
        const state = createMeetingState({
            records: [
                {
                    id: '1',
                    name: 'Meeting 1',
                    date: new Date(),
                    members: [],
                },
            ],
        });
        const action = clearRecords();
        const newState = historyReducers(state, action);
        expect(newState.records).toEqual([]);
    });

    it('should load records into store', () => {
        const state = createMeetingState();
        const meetings = [recordFactory({ id: '1' })];
        const action = loadRecords({ meetings });
        const newState = historyReducers(state, action);
        expect(newState.records).toEqual(meetings);
    });
});
