import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopunjavaPrilogeZahtevPatentComponent } from './popunjava-priloge-zahtev-patent.component';

describe('PopunjavaPrilogeZahtevPatentComponent', () => {
  let component: PopunjavaPrilogeZahtevPatentComponent;
  let fixture: ComponentFixture<PopunjavaPrilogeZahtevPatentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopunjavaPrilogeZahtevPatentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopunjavaPrilogeZahtevPatentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
