import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriloziComponent } from './prilozi.component';

describe('PriloziComponent', () => {
  let component: PriloziComponent;
  let fixture: ComponentFixture<PriloziComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriloziComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriloziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
