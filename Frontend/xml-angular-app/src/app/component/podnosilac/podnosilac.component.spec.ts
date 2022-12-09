import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodnosilacComponent } from './podnosilac.component';

describe('PodnosilacComponent', () => {
  let component: PodnosilacComponent;
  let fixture: ComponentFixture<PodnosilacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodnosilacComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PodnosilacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
