import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FizickoLicePrikazZahtevaComponent } from './fizicko-lice-prikaz-zahteva.component';

describe('FizickoLicePrikazZahtevaComponent', () => {
  let component: FizickoLicePrikazZahtevaComponent;
  let fixture: ComponentFixture<FizickoLicePrikazZahtevaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FizickoLicePrikazZahtevaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FizickoLicePrikazZahtevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
