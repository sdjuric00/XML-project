import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedPatentComponent } from './red-patent.component';

describe('RedPatentComponent', () => {
  let component: RedPatentComponent;
  let fixture: ComponentFixture<RedPatentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedPatentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedPatentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
