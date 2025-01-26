import { Route } from '@angular/router';
import { RecordCreateComponent } from './record-create/record-create.component';
import { RecordListComponent } from './record-list/record-list.component';

export const meetingRoutes: Route[] = [
    { path: '', component: RecordCreateComponent },
    { path: 'list', component: RecordListComponent },
    { path: '**', redirectTo: '' },
];
