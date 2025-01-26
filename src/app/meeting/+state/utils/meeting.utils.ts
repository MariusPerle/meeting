import { isMeeting, Record } from './meeting.interface';

export const meetingsStoreKey = 'meetings';

export function loadMeetingsFromLocalStorage(): Record[] {
    const localStorageValue = localStorage.getItem(meetingsStoreKey);
    if (!localStorageValue) {
        return [];
    }
    const meetings = JSON.parse(localStorageValue).map((meeting: Record) => ({
        ...meeting,
        date: new Date(meeting.date),
    }));

    if (!(Array.isArray(meetings) && meetings.every(isMeeting))) {
        return [];
    }
    return meetings;
}

export function saveToLocalStorage(history: Record[]) {
    localStorage.setItem(meetingsStoreKey, JSON.stringify(history));
}
