import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacacionesPage } from './vacaciones.page';

describe('VacacionesPage', () => {
  let component: VacacionesPage;
  let fixture: ComponentFixture<VacacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacacionesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
