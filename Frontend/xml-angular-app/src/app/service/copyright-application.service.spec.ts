import { TestBed } from '@angular/core/testing';

import { CopyrightApplicationService } from './copyright-application.service';

describe('CopyrightApplicationService', () => {
  let service: CopyrightApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CopyrightApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
