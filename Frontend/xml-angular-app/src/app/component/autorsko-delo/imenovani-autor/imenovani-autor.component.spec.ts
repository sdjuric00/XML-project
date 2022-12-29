import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImenovaniAutorComponent } from './imenovani-autor.component';

describe('ImenovaniAutorComponent', () => {
  let component: ImenovaniAutorComponent;
  let fixture: ComponentFixture<ImenovaniAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImenovaniAutorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImenovaniAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
