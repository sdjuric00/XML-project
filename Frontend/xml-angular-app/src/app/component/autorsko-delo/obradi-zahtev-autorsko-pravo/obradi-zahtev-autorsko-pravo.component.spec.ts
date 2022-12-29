import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObradiZahtevAutorskoPravoComponent } from './obradi-zahtev-autorsko-pravo.component';

describe('ObradiZahtevAutorskoPravoComponent', () => {
  let component: ObradiZahtevAutorskoPravoComponent;
  let fixture: ComponentFixture<ObradiZahtevAutorskoPravoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObradiZahtevAutorskoPravoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObradiZahtevAutorskoPravoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
