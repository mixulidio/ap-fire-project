import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarOrdensComponent } from './importar-ordens.component';

describe('ImportarOrdensComponent', () => {
  let component: ImportarOrdensComponent;
  let fixture: ComponentFixture<ImportarOrdensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportarOrdensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportarOrdensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
