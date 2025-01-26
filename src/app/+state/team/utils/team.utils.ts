import { isTeamMember, TeamMember } from './team.interface';

export const teamStoreKey = 'team';

export function loadTeamFromLocalStorage(): TeamMember[] {
    const localStorageValue = localStorage.getItem(teamStoreKey);
    if (!localStorageValue) {
        return [];
    }
    const loadedTeam = JSON.parse(localStorageValue);
    if (!(Array.isArray(loadedTeam) && loadedTeam.every(isTeamMember))) {
        return [];
    }
    return loadedTeam;
}

export function saveToLocalStorage(team: TeamMember[]) {
    localStorage.setItem(teamStoreKey, JSON.stringify(team));
}
