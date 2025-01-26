import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetComponent } from './reset.component';
import { mockLocalStorage } from '../../../test/local-storage-mock';

describe('ResetComponent', () => {
    let component: ResetComponent;
    let fixture: ComponentFixture<ResetComponent>;

    beforeAll(() => {
        HTMLDialogElement.prototype.show = jest.fn();
        HTMLDialogElement.prototype.showModal = jest.fn();
        HTMLDialogElement.prototype.close = jest.fn();
    });

    beforeEach(async () => {
        mockLocalStorage();
        Object.defineProperty(window, 'location', {
            value: { reload: jest.fn() },
        });

        await TestBed.configureTestingModule({
            imports: [ResetComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ResetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // for more test an update of jsdom is needed
    // issue: https://github.com/jsdom/jsdom/issues/3294

    it('should create', () => {
        jest.spyOn(localStorage, 'clear');
        expect(component).toBeTruthy();
        component.reset();
        expect(localStorage.clear).toHaveBeenCalled();
        expect(window.location.reload).toHaveBeenCalled();
    });
});
