import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaZahtevaZigoviComponent } from './tabela-zahteva-zigovi.component';

describe('TabelaZahtevaZigoviComponent', () => {
  let component: TabelaZahtevaZigoviComponent;
  let fixture: ComponentFixture<TabelaZahtevaZigoviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaZahtevaZigoviComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaZahtevaZigoviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
