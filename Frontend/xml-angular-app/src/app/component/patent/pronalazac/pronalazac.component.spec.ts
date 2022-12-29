import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PronalazacComponent } from './pronalazac.component';

describe('PronalazacComponent', () => {
  let component: PronalazacComponent;
  let fixture: ComponentFixture<PronalazacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PronalazacComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PronalazacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
