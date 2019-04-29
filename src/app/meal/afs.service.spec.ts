import { TestBed } from '@angular/core/testing';

import { AfsService } from './afs.service';

describe('AfsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AfsService = TestBed.get(AfsService);
    expect(service).toBeTruthy();
  });
});
