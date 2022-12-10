import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DostavljanjeComponent } from './dostavljanje.component';

describe('DostavljanjeComponent', () => {
  let component: DostavljanjeComponent;
  let fixture: ComponentFixture<DostavljanjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DostavljanjeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DostavljanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
