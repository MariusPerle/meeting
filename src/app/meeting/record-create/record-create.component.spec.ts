import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecordCreateComponent } from './record-create.component';
import { provideMockStore } from '@ngrx/store/testing';
import { selectMembers } from '../../+state/team/team.selectors';
import { teamMemberFactory } from '../../+state/team/utils/team-mock';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { saveRecord } from '../+state/meeting.actions';

describe('RecordingMeetingComponent', () => {
    let component: RecordCreateComponent;
    let fixture: ComponentFixture<RecordCreateComponent>;
    const members = [
        teamMemberFactory({ id: '1' }),
        teamMemberFactory({ id: '2' }),
    ];

    beforeEach(async () => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2023-01-01:00:00:00'));

        await TestBed.configureTestingModule({
            imports: [RecordCreateComponent, RouterModule.forRoot([])],
            providers: [
                provideMockStore({
                    selectors: [
                        {
                            selector: selectMembers,
                            value: members,
                        },
                    ],
                }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(RecordCreateComponent);
        component = fixture.componentInstance;
        jest.spyOn(
            (component as unknown as { store: Store }).store,
            'dispatch',
        );

        fixture.detectChanges();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render initial state', () => {
        expect(fixture).toMatchSnapshot();
    });

    it('should create record where all members are present and time was tracked', async () => {
        fixture.nativeElement
            .querySelector('[data-test="1-team-member"] .track-time button')
            .click();
        fixture.detectChanges();
        jest.setSystemTime(new Date('2023-01-01:00:01:00'));
        fixture.nativeElement
            .querySelector('[data-test="2-team-member"] .track-time button')
            .click();
        fixture.detectChanges();
        jest.setSystemTime(new Date('2023-01-01:00:02:40'));
        fixture.nativeElement
            .querySelector('[data-test="end-meeting"]')
            .click();
        fixture.detectChanges();
        expect(fixture).toMatchSnapshot();
        const title = fixture.nativeElement.querySelector('#title');
        title.value = 'Test';
        title.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        fixture.nativeElement.querySelector('[data-test="save-data"]').click();
        expect(
            (component as unknown as { store: Store }).store.dispatch,
        ).toHaveBeenCalledWith(
            saveRecord({
                meeting: {
                    name: 'Test',
                    members: [
                        {
                            id: '1',
                            time: 60000,
                            note: '',
                            attended: true,
                            participated: true,
                        },
                        {
                            id: '2',
                            time: 100000,
                            note: '',
                            attended: true,
                            participated: true,
                        },
                    ],
                },
            }),
        );
    });

    it('should create record where one member was absent', async () => {
        fixture.nativeElement
            .querySelector('[data-test="1-team-member"] .track-time button')
            .click();
        fixture.detectChanges();
        jest.setSystemTime(new Date('2023-01-01:00:01:00'));
        fixture.nativeElement.querySelector('#attended2').click();
        const title = fixture.nativeElement.querySelector('#title');
        title.value = 'Test';
        title.dispatchEvent(new Event('input'));
        fixture.nativeElement
            .querySelector('[data-test="end-meeting"]')
            .click();
        fixture.detectChanges();
        fixture.nativeElement.querySelector('[data-test="save-data"]').click();
        expect(
            (component as unknown as { store: Store }).store.dispatch,
        ).toHaveBeenCalledWith(
            saveRecord({
                meeting: {
                    name: 'Test',
                    members: [
                        {
                            id: '1',
                            time: 60000,
                            note: '',
                            attended: true,
                            participated: true,
                        },
                    ],
                },
            }),
        );
    });
});
