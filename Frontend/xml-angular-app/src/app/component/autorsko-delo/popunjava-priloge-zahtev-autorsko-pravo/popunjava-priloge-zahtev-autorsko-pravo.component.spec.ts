import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopunjavaPrilogeZahtevAutorskoPravoComponent } from './popunjava-priloge-zahtev-autorsko-pravo.component';

describe('PopunjavaPrilogeZahtevAutorskoPravoComponent', () => {
  let component: PopunjavaPrilogeZahtevAutorskoPravoComponent;
  let fixture: ComponentFixture<PopunjavaPrilogeZahtevAutorskoPravoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopunjavaPrilogeZahtevAutorskoPravoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopunjavaPrilogeZahtevAutorskoPravoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
