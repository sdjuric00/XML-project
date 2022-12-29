import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImenovaniAutorPrikazZahtevaComponent } from './imenovani-autor-prikaz-zahteva.component';

describe('ImenovaniAutorPrikazZahtevaComponent', () => {
  let component: ImenovaniAutorPrikazZahtevaComponent;
  let fixture: ComponentFixture<ImenovaniAutorPrikazZahtevaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImenovaniAutorPrikazZahtevaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImenovaniAutorPrikazZahtevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
