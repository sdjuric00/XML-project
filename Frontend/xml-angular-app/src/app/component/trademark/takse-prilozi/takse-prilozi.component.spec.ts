import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaksePriloziComponent } from './takse-prilozi.component';

describe('TaksePriloziComponent', () => {
  let component: TaksePriloziComponent;
  let fixture: ComponentFixture<TaksePriloziComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaksePriloziComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaksePriloziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
