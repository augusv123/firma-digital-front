import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsPagePage } from './options-page.page';

describe('OptionsPagePage', () => {
  let component: OptionsPagePage;
  let fixture: ComponentFixture<OptionsPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
