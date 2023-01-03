import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichEditKomponentaComponent } from './rich-edit-komponenta.component';

describe('RichEditKomponentaComponent', () => {
  let component: RichEditKomponentaComponent;
  let fixture: ComponentFixture<RichEditKomponentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RichEditKomponentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RichEditKomponentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
