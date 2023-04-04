import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tab2PessoaComponent } from './tab2-pessoa.component';

describe('Tab2PessoaComponent', () => {
  let component: Tab2PessoaComponent;
  let fixture: ComponentFixture<Tab2PessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tab2PessoaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tab2PessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
