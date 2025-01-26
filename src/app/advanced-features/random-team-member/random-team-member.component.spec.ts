import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RandomTeamMemberComponent } from './random-team-member.component';
import { provideMockStore } from '@ngrx/store/testing';
import { TeamStore } from '../../+state/team/team.store';

describe('RandomTeamMemberComponent', () => {
    let component: RandomTeamMemberComponent;
    let fixture: ComponentFixture<RandomTeamMemberComponent>;
    let store: TeamStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RandomTeamMemberComponent],
            providers: [provideMockStore()],
        }).compileComponents();

        fixture = TestBed.createComponent(RandomTeamMemberComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        store = TestBed.inject(TeamStore);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should send action to trigger random selection', () => {
        const dispatchSpy = jest.spyOn(store, 'randomSelection');
        expect(component).toBeTruthy();
        const inputAmount: HTMLInputElement =
            fixture.debugElement.nativeElement.querySelector(
                '#random-assignment-amount',
            );
        inputAmount.value = '2';
        inputAmount.dispatchEvent(new Event('input'));
        const interactionButton: HTMLButtonElement =
            fixture.debugElement.nativeElement.querySelector('button');
        interactionButton.click();
        expect(dispatchSpy).toHaveBeenCalledWith(2);
    });
});
