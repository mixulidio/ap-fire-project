import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Brapi1Component } from './brapi1.component';

describe('Brapi1Component', () => {
  let component: Brapi1Component;
  let fixture: ComponentFixture<Brapi1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Brapi1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Brapi1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
