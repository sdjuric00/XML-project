import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopunjavaPrilogeZahtevZigComponent } from './popunjava-priloge-zahtev-zig.component';

describe('PopunjavaPrilogeZahtevZigComponent', () => {
  let component: PopunjavaPrilogeZahtevZigComponent;
  let fixture: ComponentFixture<PopunjavaPrilogeZahtevZigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopunjavaPrilogeZahtevZigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopunjavaPrilogeZahtevZigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
