import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetComponent } from './reset/reset.component';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
    selector: 'meeting-header',
    imports: [CommonModule, ResetComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    private readonly appService = inject(AppService);
    private readonly router = inject(Router);

    title$ = this.appService.title$;
    interactions = viewChild<ElementRef<HTMLDivElement>>('interactions');

    navigate(path: string) {
        this.router
            .navigate([path])
            .then(() => this.interactions()?.nativeElement.hidePopover());
    }
}
