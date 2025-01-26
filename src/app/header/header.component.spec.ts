import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeaderComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('sould render corrently', () => {
        expect(component).toBeTruthy();
        expect(fixture).toMatchSnapshot();
    });

    it('should open and close popover with navigation', () => {
        const popover: HTMLDivElement = fixture.nativeElement.querySelector(
            '.navigation-popover',
        );
        popover.showPopover = jest.fn();
        popover.hidePopover = jest.fn();
        fixture.nativeElement.querySelector('.bi-list').click();
        expect(popover.showPopover).toHaveBeenCalled();

        jest.spyOn(
            (component as unknown as { router: Router }).router,
            'navigate',
        );

        fixture.nativeElement.querySelector('.navigation-popover div').click();
        expect(popover.hidePopover).toHaveBeenCalled();

        fixture.nativeElement.querySelector('.navigation-popover div').click();
        expect(
            (component as unknown as { router: Router }).router.navigate,
        ).toHaveBeenCalledWith(['/']);
    });
});
