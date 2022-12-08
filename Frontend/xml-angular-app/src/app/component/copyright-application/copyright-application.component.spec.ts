import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyrightApplicationComponent } from './copyright-application.component';

describe('CopyrightApplicationComponent', () => {
  let component: CopyrightApplicationComponent;
  let fixture: ComponentFixture<CopyrightApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyrightApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CopyrightApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
