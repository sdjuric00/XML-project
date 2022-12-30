import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObradiZahtevZigComponent } from './obradi-zahtev-zig.component';

describe('ObradiZahtevZigComponent', () => {
  let component: ObradiZahtevZigComponent;
  let fixture: ComponentFixture<ObradiZahtevZigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObradiZahtevZigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObradiZahtevZigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
