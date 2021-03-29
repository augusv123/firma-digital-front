import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { VacacionesService } from 'src/app/services/vacaciones.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  fileurl
  blob
  selectedFile
  signedFiles
  file
  fetched = false
  constructor(private sanitizer:DomSanitizer,private documentsService: VacacionesService,private route : ActivatedRoute) { }

  ngOnInit() {
    const filename = this.route.snapshot.paramMap.get('filename');
    console.log(filename)
    if(filename){
      this.getSignedForm("public/signedForms/"+filename+".pdf")
   
    }
    // this.blob = this.getSafeUrl( this.data.fileurl)
    // this.getPDF()
    // this.notifySignature()
    this.getAllSignedFiles()
 
  }
  getAllSignedFiles(){
    this.documentsService.getAllSignedFiles().subscribe(
      res => {
        this.signedFiles = res
      },
      error => {
        console.log(error)
      })
    }
  
    getSignedForm(filename){
      console.log(filename)

      this.documentsService.getSignedForm(filename).subscribe(
        res => {
          this.blob = new Blob([res], { type: "application/pdf"});
          this.fileurl = URL.createObjectURL(this.blob);
      this.blob = this.getSafeUrl( this.fileurl)
  
          this.fetched = true
          console.log(res)
        },
        error => {
          console.log(error)
          this.fetched = false

        }
      )
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
  notifySignature(){
    // this.documentsService.sendMail().subscribe(
    //   res => {
    //     console.log(res)
    //   },
    //   error=> {
    //     console.log(error)
    //   }
    // )
  }

}
