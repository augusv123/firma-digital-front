import { Component, Input, OnInit } from '@angular/core';
import { VacacionesService } from '../services/vacaciones.service';

@Component({
  selector: 'app-pdfview',
  templateUrl: './pdfview.page.html',
  styleUrls: ['./pdfview.page.scss'],
})
export class PDFViewPage implements OnInit {

  @Input() blob: string;
  @Input() filename: string;

  constructor(private documentService: VacacionesService) { }

  ngOnInit() {
    console.log(this.blob)
  }
  
  signForm(){
    this.documentService.signForm(this.filename).subscribe(
      res => {
        console.log(res)
        this.downLoadFile(res, "application/pdf","pdf")
      },
      error => {
        console.log(error)
      })
    }
    downLoadFile(data: any, type: string,ext:string) {
      let blob = new Blob([data], { type: type});
      let url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = "solicituddevacaciones"+ext;
      a.click(); 
      
    }
  

}
