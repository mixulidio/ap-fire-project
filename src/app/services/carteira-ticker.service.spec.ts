import { TestBed } from '@angular/core/testing';

import { CarteiraTickerService } from './carteira-ticker.service';

describe('CarteiraTickerService', () => {
  let service: CarteiraTickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarteiraTickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
