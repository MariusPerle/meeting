import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecordEntryComponent } from './record-entry.component';
import {
    recordFactory,
    recordMemberFactory,
} from '../../+state/utils/meeting-mock';
import { provideMockStore } from '@ngrx/store/testing';

describe('RecordEntryComponent', () => {
    let fixture: ComponentFixture<RecordEntryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RecordEntryComponent],
            providers: [provideMockStore()],
        }).compileComponents();

        fixture = TestBed.createComponent(RecordEntryComponent);
        fixture.componentRef.setInput(
            'record',
            recordFactory({
                id: '1',
                members: [
                    recordMemberFactory({ id: '2', time: 100000 }),
                    recordMemberFactory({ id: '3', time: 150000 }),
                ],
            }),
        );
        fixture.detectChanges();
    });

    it('should render correctly', () => {
        expect(fixture).toMatchSnapshot();
    });
});
