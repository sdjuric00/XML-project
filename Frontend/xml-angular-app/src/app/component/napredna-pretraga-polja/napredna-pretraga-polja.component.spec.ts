import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaprednaPretragaPoljaComponent } from './napredna-pretraga-polja.component';

describe('NaprednaPretragaPoljaComponent', () => {
  let component: NaprednaPretragaPoljaComponent;
  let fixture: ComponentFixture<NaprednaPretragaPoljaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaprednaPretragaPoljaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaprednaPretragaPoljaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
