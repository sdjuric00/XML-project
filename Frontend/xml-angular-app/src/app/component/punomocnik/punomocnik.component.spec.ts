import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PunomocnikComponent } from './punomocnik.component';

describe('PunomocnikComponent', () => {
  let component: PunomocnikComponent;
  let fixture: ComponentFixture<PunomocnikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PunomocnikComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PunomocnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
