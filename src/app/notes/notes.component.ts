import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesService } from './notes.service';
import { ReactiveFormsModule } from '@angular/forms';
import EditorJS from '@editorjs/editorjs';

@Component({
    selector: 'meeting-notes',
    imports: [CommonModule, ReactiveFormsModule],
    providers: [NotesService],
    templateUrl: './notes.component.html',
    styleUrl: './notes.component.scss',
})
export class NotesComponent implements OnInit {
    private readonly notesService = inject(NotesService);

    editor!: EditorJS;

    ngOnInit(): void {
        this.editor = new EditorJS({
            holder: 'editor-js',
            placeholder: 'Type here...',
            data: this.notesService.loadNotes(),
            onChange: (api) => {
                api.saver.save().then((outputData) => {
                    this.notesService.saveNotes(outputData);
                });
            },
        });
    }
}
