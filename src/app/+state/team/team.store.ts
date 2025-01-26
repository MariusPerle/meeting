import { computed, effect, Injectable, signal } from '@angular/core';
import {
    TeamMember,
    TeamMemberWithRandomPosition,
} from './utils/team.interface';
import {
    loadTeamFromLocalStorage,
    saveToLocalStorage,
} from './utils/team.utils';

@Injectable({
    providedIn: 'root',
})
export class TeamStore {
    // State
    private readonly members = signal<TeamMember[]>(loadTeamFromLocalStorage());
    private readonly randomMembers = signal<{ id: string }[]>([]);

    // Selectors (Computed Signals)
    readonly selectMembers = computed<TeamMemberWithRandomPosition[]>(() =>
        this.members().map((member) => ({
            ...member,
            randomPosition: this.randomMembers().findIndex(
                (randomMember) => randomMember.id === member.id,
            ),
        })),
    );

    constructor() {
        // Persistence effect
        effect(() => {
            saveToLocalStorage(this.members());
        });
    }

    readonly selectMember = (id: string) =>
        computed(() => this.selectMembers().find((member) => member.id === id));

    // Actions
    addMember(name: string) {
        this.members.update((members) => [
            ...members,
            { name, id: Math.random().toString(), history: [] },
        ]);
    }

    removeMember(id: string) {
        this.members.update((members) =>
            members.filter((member) => member.id !== id),
        );
    }

    randomSelection(amount: number) {
        let memberPool = [...this.members()];
        const selectedMembers: TeamMember[] = [];

        for (let i = 0; i < amount && memberPool.length; i++) {
            const randomIndex = Math.floor(Math.random() * memberPool.length);
            selectedMembers.push(memberPool[randomIndex]);
            memberPool = memberPool.filter(
                (member) => member !== memberPool[randomIndex],
            );
        }

        this.randomMembers.set(selectedMembers.map(({ id }) => ({ id })));
    }
}
