import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecordListComponent } from './record-list.component';
import { provideMockStore } from '@ngrx/store/testing';
import { selectRecords } from '../+state/meeting.selectors';
import { recordFactory } from '../+state/utils/meeting-mock';

describe('HistoryComponent', () => {
    let component: RecordListComponent;
    let fixture: ComponentFixture<RecordListComponent>;
    const selectedRecords = [recordFactory({ id: '1' })];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RecordListComponent],
            providers: [
                provideMockStore({
                    selectors: [
                        {
                            selector: selectRecords,
                            value: selectedRecords,
                        },
                    ],
                }),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(RecordListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render list', () => {
        expect(component).toBeTruthy();
        expect(fixture).toMatchSnapshot();
    });

    it('should export records', async () => {
        // required jest mocks
        let file!: Blob;
        global.URL.createObjectURL = jest.fn((fileBlob: Blob) => {
            file = fileBlob;
            return 'https://mariusperle.de';
        });
        global.URL.revokeObjectURL = jest.fn();

        // required dom mocks
        const link = {
            click: jest.fn(),
            remove: jest.fn(),
        } as unknown as HTMLAnchorElement;
        jest.spyOn(document, 'createElement').mockImplementation(() => link);

        // triggering export
        fixture.nativeElement
            .querySelector('[data-test="record-list-export"]')
            .click();

        // checking if download was called
        expect(link.download).toBe('records.json');
        expect(link.href).toBe('https://mariusperle.de');
        expect(link.click).toHaveBeenCalledTimes(1);
        expect(link.remove).toHaveBeenCalledTimes(1);

        // checking if file was created
        expect(file).toBeTruthy();
        expect(file.type).toBe('text/json');
        expect(file.size).toEqual(JSON.stringify(selectedRecords).length);
    });
});
