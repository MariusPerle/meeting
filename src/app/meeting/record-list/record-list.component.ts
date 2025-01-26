import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { MeetingStore } from '../+state/meeting.reducer';
import { selectRecords } from '../+state/meeting.selectors';
import { RecordEntryComponent } from './record-entry/record-entry.component';

@Component({
    selector: 'daily-record-list',
    imports: [CommonModule, RecordEntryComponent],
    templateUrl: './record-list.component.html',
    styleUrl: './record-list.component.scss',
})
export class RecordListComponent {
    private readonly store: Store<MeetingStore> = inject(Store);
    records = this.store.selectSignal(selectRecords);

    exportRecords() {
        const json = JSON.stringify(this.records());
        const blob = new Blob([json], { type: 'text/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'records.json';
        a.click();

        // clean up
        URL.revokeObjectURL(url);
        a.remove();
    }
}
