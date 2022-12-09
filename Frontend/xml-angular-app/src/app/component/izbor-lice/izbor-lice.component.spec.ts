import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IzborLiceComponent } from './izbor-lice.component';

describe('IzborLiceComponent', () => {
  let component: IzborLiceComponent;
  let fixture: ComponentFixture<IzborLiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IzborLiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IzborLiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
