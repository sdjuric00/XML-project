import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DopunskaPrijavaComponent } from './dopunska-prijava.component';

describe('DopunskaPrijavaComponent', () => {
  let component: DopunskaPrijavaComponent;
  let fixture: ComponentFixture<DopunskaPrijavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DopunskaPrijavaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DopunskaPrijavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
