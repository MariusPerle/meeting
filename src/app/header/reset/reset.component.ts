import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'daily-reset',
    imports: [CommonModule],
    templateUrl: './reset.component.html',
    styleUrl: './reset.component.scss',
})
export class ResetComponent {
    reset() {
        localStorage.clear();
        window.location.reload();
    }
}
