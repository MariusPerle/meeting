import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'meeting-new-feature',
    imports: [CommonModule],
    templateUrl: './new-feature.component.html',
    styleUrl: './new-feature.component.scss',
})
export class NewFeatureComponent implements OnInit {
    featureStoreKey = 'latest-seem-version';

    version = viewChild<ElementRef<HTMLSpanElement>>('version');
    dialog = viewChild<ElementRef<HTMLDialogElement>>('newFeatureDialog');

    ngOnInit(): void {
        const version = localStorage.getItem(this.featureStoreKey);
        setTimeout(() => {
            if (
                version &&
                this.version()?.nativeElement.innerText !== version
            ) {
                this.dialog()?.nativeElement.showModal();
            }
        });
    }

    close() {
        localStorage.setItem(
            this.featureStoreKey,
            this.version()?.nativeElement.innerText ?? '',
        );
        this.dialog()?.nativeElement.close();
    }
}
