import { Record } from './utils/meeting.interface';
import { createFeature, createReducer, on } from '@ngrx/store';
import {
    saveRecord,
    clearRecords,
    loadRecords,
    removeRecord,
} from './meeting.actions';
import { AppStore } from '../../+state/appStore';

export interface MeetingState {
    records: Record[];
}

export const initialState: MeetingState = {
    records: [],
};

export const historyReducers = createReducer(
    initialState,
    on(saveRecord, (state, { meeting }) => {
        return {
            ...state,
            records: [
                ...state.records,
                { ...meeting, id: Date.now().toString(), date: new Date() },
            ],
        };
    }),
    on(removeRecord, (state, { id }) => {
        return {
            ...state,
            records: state.records.filter((meeting) => meeting.id !== id),
        };
    }),
    on(clearRecords, (state) => {
        return {
            ...state,
            records: [],
        };
    }),
    on(loadRecords, (state, { meetings }) => {
        return {
            ...state,
            records: meetings,
        };
    }),
);

export const featureConfig = createFeature({
    name: 'meeting',
    reducer: historyReducers,
});

export interface MeetingStore extends AppStore {
    meeting: MeetingState;
}
