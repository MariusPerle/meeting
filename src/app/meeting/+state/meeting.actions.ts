import { createAction, props } from '@ngrx/store';
import { Record } from './utils/meeting.interface';

export const loadRecords = createAction(
    '[Records] Loaded',
    props<{ meetings: Record[] }>(),
);

export const saveRecord = createAction(
    '[Record] Saved',
    props<{ meeting: Omit<Record, 'id' | 'date'> }>(),
);

export const removeRecord = createAction(
    '[Record] Removed',
    props<{ id: string }>(),
);

export const clearRecords = createAction('[Records] Cleared');
