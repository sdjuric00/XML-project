import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahtevZigDetaljiComponent } from './zahtev-zig-detalji.component';

describe('ZahtevZigDetaljiComponent', () => {
  let component: ZahtevZigDetaljiComponent;
  let fixture: ComponentFixture<ZahtevZigDetaljiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZahtevZigDetaljiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZahtevZigDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
