import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBasicComponent } from './menu-basic.component';

describe('MenuBasicComponent', () => {
  let component: MenuBasicComponent;
  let fixture: ComponentFixture<MenuBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
