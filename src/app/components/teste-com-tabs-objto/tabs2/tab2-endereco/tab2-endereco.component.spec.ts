import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab2EnderecoComponent } from './tab2-endereco.component';

describe('Tab2EnderecoComponent', () => {
  let component: Tab2EnderecoComponent;
  let fixture: ComponentFixture<Tab2EnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tab2EnderecoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tab2EnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
