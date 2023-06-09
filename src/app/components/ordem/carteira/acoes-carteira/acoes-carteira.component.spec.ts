import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcoesCarteiraComponent } from './acoes-carteira.component';

describe('AcoesCarteiraComponent', () => {
  let component: AcoesCarteiraComponent;
  let fixture: ComponentFixture<AcoesCarteiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcoesCarteiraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcoesCarteiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
