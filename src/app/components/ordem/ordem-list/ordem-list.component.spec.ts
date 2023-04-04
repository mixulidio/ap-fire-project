import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdemListComponent } from './ordem-list.component';

describe('OrdemListComponent', () => {
  let component: OrdemListComponent;
  let fixture: ComponentFixture<OrdemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdemListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
