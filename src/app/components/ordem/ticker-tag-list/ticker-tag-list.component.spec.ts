import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerTagListComponent } from './ticker-tag-list.component';

describe('TickerTagListComponent', () => {
  let component: TickerTagListComponent;
  let fixture: ComponentFixture<TickerTagListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TickerTagListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TickerTagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
