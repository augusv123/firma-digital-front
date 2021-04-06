import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdfview',
  templateUrl: './pdfview.page.html',
  styleUrls: ['./pdfview.page.scss'],
})
export class PDFViewPage implements OnInit {

  @Input() blob: string;

  constructor() { }

  ngOnInit() {
    console.log(this.blob)
  }

}
