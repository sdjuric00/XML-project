import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahtevPatentDetaljiComponent } from './zahtev-patent-detalji.component';

describe('ZahtevPatentDetaljiComponent', () => {
  let component: ZahtevPatentDetaljiComponent;
  let fixture: ComponentFixture<ZahtevPatentDetaljiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZahtevPatentDetaljiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZahtevPatentDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
