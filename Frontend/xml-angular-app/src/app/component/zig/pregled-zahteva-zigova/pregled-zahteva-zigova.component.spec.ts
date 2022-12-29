import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledZahtevaZigovaComponent } from './pregled-zahteva-zigova.component';

describe('PregledZahtevaZigovaComponent', () => {
  let component: PregledZahtevaZigovaComponent;
  let fixture: ComponentFixture<PregledZahtevaZigovaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledZahtevaZigovaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledZahtevaZigovaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
