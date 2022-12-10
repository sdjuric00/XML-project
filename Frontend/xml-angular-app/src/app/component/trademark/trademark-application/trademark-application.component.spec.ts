import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrademarkApplicationComponent } from './trademark-application.component';

describe('TrademarkApplicationComponent', () => {
  let component: TrademarkApplicationComponent;
  let fixture: ComponentFixture<TrademarkApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrademarkApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrademarkApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
