import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { AppService } from './app.service';
import { firstValueFrom } from 'rxjs';

describe('AppService', () => {
    let service: AppService;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AppService);
    });

    it('should update title', fakeAsync(async () => {
        await expect(firstValueFrom(service.title$)).resolves.toEqual('');
        service.updateTitle('Updated Title');
        flush();
        await expect(firstValueFrom(service.title$)).resolves.toEqual(
            'Updated Title',
        );
    }));
});
