import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VacacionesService } from 'src/app/services/vacaciones.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  fileurl
  blob
  constructor(private sanitizer:DomSanitizer,private documentsService: VacacionesService) { }

  ngOnInit() {
    // this.blob = this.getSafeUrl( this.data.fileurl)
    this.getPDF()
 
  }
  getSafeUrl(fileName) {    
    return this.sanitizer.bypassSecurityTrustResourceUrl(fileName);
  }
  getPDF(){
    this.documentsService.getPDF().subscribe(
      res=> {
        this.blob = new Blob([res], { type: "application/pdf"});
        this.fileurl = URL.createObjectURL(this.blob);
    this.blob = this.getSafeUrl( this.fileurl)


      },
      error => {
        console.log(error)
      }
    )
  }   

}
