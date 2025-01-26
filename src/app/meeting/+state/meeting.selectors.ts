import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MeetingState } from './meeting.reducer';

export const selectTeam = createFeatureSelector<MeetingState>('meeting');

export const selectRecords = createSelector(
    selectTeam,
    (state) => state.records,
);
