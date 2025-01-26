import { Record, RecordMember } from './meeting.interface';

export function recordFactory(
    overwrite: Pick<Record, 'id'> & Partial<Record>,
): Record {
    return {
        name: `Meeting`,
        date: new Date('2022-01-01'),
        members: [],
        ...overwrite,
    };
}

export function recordMemberFactory(
    overwrite: Pick<RecordMember, 'id'> & Partial<RecordMember>,
): RecordMember {
    return {
        time: 0,
        note: '',
        attended: true,
        participated: false,
        ...overwrite,
    };
}
