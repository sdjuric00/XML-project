import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedAutorskaPravaComponent } from './red-autorska-prava.component';

describe('RedAutorskaPravaComponent', () => {
  let component: RedAutorskaPravaComponent;
  let fixture: ComponentFixture<RedAutorskaPravaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedAutorskaPravaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedAutorskaPravaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
