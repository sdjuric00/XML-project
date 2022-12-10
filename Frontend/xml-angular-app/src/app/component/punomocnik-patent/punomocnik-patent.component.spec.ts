import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PunomocnikPatentComponent } from './punomocnik-patent.component';

describe('PunomocnikPatentComponent', () => {
  let component: PunomocnikPatentComponent;
  let fixture: ComponentFixture<PunomocnikPatentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PunomocnikPatentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PunomocnikPatentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
