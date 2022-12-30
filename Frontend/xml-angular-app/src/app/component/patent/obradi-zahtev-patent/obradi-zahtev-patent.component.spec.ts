import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObradiZahtevPatentComponent } from './obradi-zahtev-patent.component';

describe('ObradiZahtevPatentComponent', () => {
  let component: ObradiZahtevPatentComponent;
  let fixture: ComponentFixture<ObradiZahtevPatentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObradiZahtevPatentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObradiZahtevPatentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
