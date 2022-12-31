import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdbijZahtevComponent } from './odbij-zahtev.component';

describe('RejectDrivingComponent', () => {
  let component: OdbijZahtevComponent;
  let fixture: ComponentFixture<OdbijZahtevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdbijZahtevComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdbijZahtevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
