import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaZahtevaPatentaComponent } from './tabela-zahteva-patenta.component';

describe('TabelaZahtevaPatentaComponent', () => {
  let component: TabelaZahtevaPatentaComponent;
  let fixture: ComponentFixture<TabelaZahtevaPatentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaZahtevaPatentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaZahtevaPatentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
