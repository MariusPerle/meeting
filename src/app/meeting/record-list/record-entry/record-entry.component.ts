import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordMemberComponent } from './record-member/record-member.component';
import { Record } from '../../+state/utils/meeting.interface';

@Component({
    selector: 'daily-record-entry',
    imports: [CommonModule, RecordMemberComponent],
    templateUrl: './record-entry.component.html',
    styleUrl: './record-entry.component.scss',
})
export class RecordEntryComponent {
    record = input.required<Record>();

    get totalTime() {
        return this.record().members.reduce(
            (acc, member) => acc + member.time,
            0,
        );
    }
}
