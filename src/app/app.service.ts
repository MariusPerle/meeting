import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    private storedTitle$ = new BehaviorSubject('');

    get title$(): Observable<string> {
        return this.storedTitle$;
    }

    updateTitle(title: string) {
        setTimeout(() => this.storedTitle$.next(title));
    }
}
