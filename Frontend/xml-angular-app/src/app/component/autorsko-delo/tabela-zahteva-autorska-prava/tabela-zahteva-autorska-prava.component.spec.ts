import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaZahtevaAutorskaPravaComponent } from './tabela-zahteva-autorska-prava.component';

describe('TabelaZahtevaAutorskaPravaComponent', () => {
  let component: TabelaZahtevaAutorskaPravaComponent;
  let fixture: ComponentFixture<TabelaZahtevaAutorskaPravaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaZahtevaAutorskaPravaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaZahtevaAutorskaPravaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
