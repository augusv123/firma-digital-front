import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PDFViewPage } from './pdfview.page';

describe('PDFViewPage', () => {
  let component: PDFViewPage;
  let fixture: ComponentFixture<PDFViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PDFViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PDFViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
