import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZigTakseComponent } from './zig-takse.component';

describe('ZigTakseComponent', () => {
  let component: ZigTakseComponent;
  let fixture: ComponentFixture<ZigTakseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZigTakseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZigTakseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
