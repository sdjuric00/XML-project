import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorskoDeloComponent } from './autorsko-delo.component';

describe('AutorskoDeloComponent', () => {
  let component: AutorskoDeloComponent;
  let fixture: ComponentFixture<AutorskoDeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorskoDeloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorskoDeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
