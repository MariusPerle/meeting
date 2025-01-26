import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppService } from '../app.service';

@Component({
    imports: [CommonModule, RouterOutlet],
    templateUrl: './meeting.component.html',
    styleUrl: './meeting.component.scss',
})
export class MeetingComponent implements OnInit {
    private readonly appService = inject(AppService);

    ngOnInit(): void {
        this.appService.updateTitle('Meeting');
    }
}
