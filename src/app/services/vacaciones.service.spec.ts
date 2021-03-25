import { TestBed } from '@angular/core/testing';

import { VacacionesService } from './vacaciones.service';

describe('VacacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VacacionesService = TestBed.get(VacacionesService);
    expect(service).toBeTruthy();
  });
});
