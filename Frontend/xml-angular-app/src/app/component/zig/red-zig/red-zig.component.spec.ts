import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedZigComponent } from './red-zig.component';

describe('RedZigComponent', () => {
  let component: RedZigComponent;
  let fixture: ComponentFixture<RedZigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedZigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedZigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
