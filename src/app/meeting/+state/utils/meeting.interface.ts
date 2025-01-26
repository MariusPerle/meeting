export interface Record {
    id: string;
    name: string;
    date: Date;
    members: RecordMember[];
}

export interface RecordMember {
    id: string;
    time: number;
    note: string;
    attended: boolean;
    participated: boolean;
}

export function isMeeting(data: object): data is Record {
    return (
        'id' in data &&
        typeof data.id === 'string' &&
        'name' in data &&
        typeof data.name === 'string' &&
        'date' in data &&
        data.date instanceof Date &&
        !isNaN(data.date.getTime()) &&
        'members' in data &&
        Array.isArray(data.members) &&
        data.members.every(isMeetingMember)
    );
}

export function isMeetingMember(data: object): data is RecordMember {
    return (
        'id' in data &&
        typeof data.id === 'string' &&
        'time' in data &&
        typeof data.time === 'number' &&
        'note' in data &&
        typeof data.note === 'string' &&
        'attended' in data &&
        typeof data.attended === 'boolean' &&
        'participated' in data &&
        typeof data.participated === 'boolean'
    );
}
