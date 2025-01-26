import { TestBed } from '@angular/core/testing';
import { NotesService } from './notes.service';
import { mockLocalStorage } from '../../test/local-storage-mock';
import { OutputData } from '@editorjs/editorjs';

describe('NotesService', () => {
    let service: NotesService;
    const exampleNote: OutputData = {
        blocks: [
            {
                id: 'a8A2TZ353o',
                type: 'paragraph',
                data: {
                    text: 'In a hole in the ground there lived a hobbit.',
                },
            },
        ],
    };

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NotesService);
        mockLocalStorage();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should load notes', () => {
        expect(service).toBeTruthy();
        localStorage.setItem(service.storeKey, JSON.stringify(exampleNote));
        expect(service.loadNotes()).toEqual(exampleNote);
    });

    it('should load empty notes', () => {
        expect(service).toBeTruthy();
        expect(service.loadNotes()).toEqual({});
        expect(localStorage.getItem(service.storeKey)).toBeNull();
    });

    it('should not load broken notes', () => {
        localStorage.setItem(service.storeKey, 'some-broken-string');
        expect(service).toBeTruthy();
        expect(service.loadNotes()).toEqual({});
        expect(localStorage.getItem(service.storeKey)).toBeNull();
    });

    it('should save notes', () => {
        service.saveNotes(exampleNote);
        expect(localStorage.getItem(service.storeKey)).toEqual(
            JSON.stringify(exampleNote),
        );
    });
});
