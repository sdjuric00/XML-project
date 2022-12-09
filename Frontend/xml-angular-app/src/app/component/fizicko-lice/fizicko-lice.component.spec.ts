import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FizickoLiceComponent } from './fizicko-lice.component';

describe('FizickoLiceComponent', () => {
  let component: FizickoLiceComponent;
  let fixture: ComponentFixture<FizickoLiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FizickoLiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FizickoLiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
