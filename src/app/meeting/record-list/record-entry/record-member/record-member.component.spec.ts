import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecordMemberComponent } from './record-member.component';
import { provideMockStore } from '@ngrx/store/testing';
import { teamMemberFactory } from '../../../../+state/team/utils/team-mock';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { recordMemberFactory } from '../../../+state/utils/meeting-mock';

describe('RecordMemberComponent', () => {
    let component: RecordMemberComponent;
    let fixture: ComponentFixture<RecordMemberComponent>;
    const memberId = '1';

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RecordMemberComponent],
            providers: [provideMockStore()],
        }).compileComponents();

        fixture = TestBed.createComponent(RecordMemberComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput(
            'recordMember',
            recordMemberFactory({
                id: memberId,
                note: 'note',
                time: 1000,
            }),
        );
        fixture.componentRef.setInput('even', true);

        // mock store
        jest.spyOn(
            (component as unknown as { store: Store }).store,
            'select',
        ).mockReturnValue(of(teamMemberFactory({ id: memberId })));
        fixture.detectChanges();
    });

    it('should display member with time', () => {
        expect(fixture).toMatchSnapshot();
    });

    it('should display member status if no time was recorded', () => {
        fixture.componentRef.setInput(
            'recordMember',
            recordMemberFactory({
                id: memberId,
                time: 0,
            }),
        );
        fixture.detectChanges();
        expect(
            fixture.nativeElement.querySelector('.status').textContent,
        ).toContain('attended');
    });
});
