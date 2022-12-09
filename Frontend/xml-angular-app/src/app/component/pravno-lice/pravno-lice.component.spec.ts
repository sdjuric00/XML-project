import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PravnoLiceComponent } from './pravno-lice.component';

describe('PravnoLiceComponent', () => {
  let component: PravnoLiceComponent;
  let fixture: ComponentFixture<PravnoLiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PravnoLiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PravnoLiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
