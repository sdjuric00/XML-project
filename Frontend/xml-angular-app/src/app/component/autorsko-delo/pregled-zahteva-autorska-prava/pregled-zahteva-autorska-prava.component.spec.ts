import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledZahtevaAutorskaPravaComponent } from './pregled-zahteva-autorska-prava.component';

describe('PregledZahtevaAutorskaPravaComponent', () => {
  let component: PregledZahtevaAutorskaPravaComponent;
  let fixture: ComponentFixture<PregledZahtevaAutorskaPravaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledZahtevaAutorskaPravaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledZahtevaAutorskaPravaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
