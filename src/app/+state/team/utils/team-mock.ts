import { TeamMember } from './team.interface';

export function teamMemberFactory(
    overwrite: Pick<TeamMember, 'id'> & Partial<TeamMember>,
): TeamMember {
    return {
        name: `Member`,
        ...overwrite,
    };
}
