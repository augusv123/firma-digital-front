import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCompletionPage } from './form-completion.page';

describe('FormCompletionPage', () => {
  let component: FormCompletionPage;
  let fixture: ComponentFixture<FormCompletionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCompletionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCompletionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
