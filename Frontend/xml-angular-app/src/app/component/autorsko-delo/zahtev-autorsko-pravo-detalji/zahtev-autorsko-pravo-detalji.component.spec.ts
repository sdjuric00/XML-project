import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahtevAutorskoPravoDetaljiComponent } from './zahtev-autorsko-pravo-detalji.component';

describe('ZahtevAutorskoPravoDetaljiComponent', () => {
  let component: ZahtevAutorskoPravoDetaljiComponent;
  let fixture: ComponentFixture<ZahtevAutorskoPravoDetaljiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZahtevAutorskoPravoDetaljiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZahtevAutorskoPravoDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
