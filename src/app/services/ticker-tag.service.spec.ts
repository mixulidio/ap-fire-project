import { TestBed } from '@angular/core/testing';

import { TickerTagService } from './ticker-tag.service';

describe('TickerTagService', () => {
  let service: TickerTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TickerTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
