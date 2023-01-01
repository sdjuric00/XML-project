import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DugmiciZaSkidanjeComponent } from './dugmici-za-skidanje.component';

describe('DugmiciZaSkidanjeComponent', () => {
  let component: DugmiciZaSkidanjeComponent;
  let fixture: ComponentFixture<DugmiciZaSkidanjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DugmiciZaSkidanjeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DugmiciZaSkidanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
