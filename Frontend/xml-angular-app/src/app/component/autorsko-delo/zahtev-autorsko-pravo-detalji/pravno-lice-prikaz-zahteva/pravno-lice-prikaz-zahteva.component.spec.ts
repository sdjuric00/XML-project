import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PravnoLicePrikazZahtevaComponent } from './pravno-lice-prikaz-zahteva.component';

describe('FizickoLicePrikazZahtevaComponent', () => {
  let component: PravnoLicePrikazZahtevaComponent;
  let fixture: ComponentFixture<PravnoLicePrikazZahtevaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PravnoLicePrikazZahtevaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PravnoLicePrikazZahtevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
