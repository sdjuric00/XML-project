import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrvobitnaPrijavaComponent } from './prvobitna-prijava.component';

describe('PrvobitnaPrijavaComponent', () => {
  let component: PrvobitnaPrijavaComponent;
  let fixture: ComponentFixture<PrvobitnaPrijavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrvobitnaPrijavaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrvobitnaPrijavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
