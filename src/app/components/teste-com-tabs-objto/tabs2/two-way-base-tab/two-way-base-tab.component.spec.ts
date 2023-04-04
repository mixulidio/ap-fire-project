import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoWayBaseTabComponent } from './two-way-base-tab.component';

describe('TwoWayBaseTabComponent', () => {
  let component: TwoWayBaseTabComponent;
  let fixture: ComponentFixture<TwoWayBaseTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwoWayBaseTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoWayBaseTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
