import { Component } from '@angular/core';
import { NotesComponent } from './notes/notes.component';
import { RouterOutlet } from '@angular/router';
import { NewFeatureComponent } from './new-feature/new-feature.component';
import { AdvancedFeaturesComponent } from './advanced-features/advanced-features.component';
import { HeaderComponent } from './header/header.component';

@Component({
    imports: [
        NotesComponent,
        RouterOutlet,
        NewFeatureComponent,
        AdvancedFeaturesComponent,
        HeaderComponent,
    ],
    providers: [],
    selector: 'daily-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {}
