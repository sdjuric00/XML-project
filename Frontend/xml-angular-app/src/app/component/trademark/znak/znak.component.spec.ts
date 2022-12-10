import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZnakComponent } from './znak.component';

describe('ZnakComponent', () => {
  let component: ZnakComponent;
  let fixture: ComponentFixture<ZnakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZnakComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZnakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
