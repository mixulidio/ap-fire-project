import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteiraTickerFormComponent } from './carteira-ticker-form.component';

describe('CarteiraTickerFormComponent', () => {
  let component: CarteiraTickerFormComponent;
  let fixture: ComponentFixture<CarteiraTickerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarteiraTickerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarteiraTickerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
