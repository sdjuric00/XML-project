import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZigPriloziComponent } from './zig-prilozi.component';

describe('ZigPriloziComponent', () => {
  let component: ZigPriloziComponent;
  let fixture: ComponentFixture<ZigPriloziComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZigPriloziComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZigPriloziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
