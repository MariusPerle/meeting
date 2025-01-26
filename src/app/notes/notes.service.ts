import { OutputData } from '@editorjs/editorjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotesService {
    readonly storeKey = 'notes';

    loadNotes() {
        const localStorageValue = localStorage.getItem(this.storeKey);
        try {
            return JSON.parse(localStorageValue ?? '{}');
        } catch {
            localStorage.removeItem(this.storeKey);
            return {};
        }
    }

    saveNotes(notes: OutputData) {
        localStorage.setItem(this.storeKey, JSON.stringify(notes));
    }
}
