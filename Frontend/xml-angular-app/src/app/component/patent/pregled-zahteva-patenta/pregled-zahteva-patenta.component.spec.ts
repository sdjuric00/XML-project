import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledZahtevaPatentaComponent } from './pregled-zahteva-patenta.component';

describe('PregledZahtevaPatentaComponent', () => {
  let component: PregledZahtevaPatentaComponent;
  let fixture: ComponentFixture<PregledZahtevaPatentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregledZahtevaPatentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PregledZahtevaPatentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
