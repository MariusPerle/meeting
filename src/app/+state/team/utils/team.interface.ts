export interface TeamMemberWithRandomPosition extends TeamMember {
    randomPosition: number;
}

export interface TeamMember {
    id: string;
    name: string;
}

export interface RandomMember {
    id: string;
}

export function isTeamMember(data: object): data is TeamMember {
    return (
        'id' in data &&
        typeof data.id === 'string' &&
        'name' in data &&
        typeof data.name === 'string'
    );
}
