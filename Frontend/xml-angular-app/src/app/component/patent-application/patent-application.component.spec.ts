import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentApplicationComponent } from './patent-application.component';

describe('PatentApplicationComponent', () => {
  let component: PatentApplicationComponent;
  let fixture: ComponentFixture<PatentApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatentApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatentApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
