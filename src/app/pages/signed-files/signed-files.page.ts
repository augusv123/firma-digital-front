import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PDFViewPage } from 'src/app/pdfview/pdfview.page';
import { AuthService } from 'src/app/services/auth.service';
import { VacacionesService } from 'src/app/services/vacaciones.service';

@Component({
  selector: 'app-signed-files',
  templateUrl: './signed-files.page.html',
  styleUrls: ['./signed-files.page.scss'],
})
export class SignedFilesPage implements OnInit {
  userSelected
  signedFiles
  avatarUrl
  blob
  fileurl
  constructor(private route: ActivatedRoute, private documentsService : VacacionesService,private authService : AuthService, private sanitizer : DomSanitizer,public modalController : ModalController) { }

  ngOnInit() {
    this.avatarUrl = localStorage.getItem('avatarUrl')
    var directory = this.route.snapshot.paramMap.get('directory');
    const id = this.route.snapshot.paramMap.get('id');
    const nombre = this.route.snapshot.paramMap.get('nombre');
    const carpeta = this.route.snapshot.paramMap.get('carpeta');
    var path = "public/signedForms/"+id+"/"+carpeta+"/"+nombre+".pdf"
    console.log(path)
    if(id && nombre && carpeta){
      this.getSignedForm(path)
    const value = path.split("/");
    directory = value[3]
    }
    // if(fulldirectory){
    //   this.getSignedForm(fulldirectory)
    // }
   
    
    console.log(directory)
    const userSelected = this.route.snapshot.paramMap.get('userSelected');

    this.authService.getUserSubject().subscribe(res => {
        
        this.getAllSignedFiles(res,directory)
        
      },
      error => console.log(error))
    

  }
  
  getAllSignedFiles(user,directory){
    const id  = user.id
    this.documentsService.getAllSignedFiles(id,directory).subscribe(
      res => {
        this.signedFiles = res
        console.log(res)
      },
      error => {
        console.log(error)
      })
    }
    getSignedForm(filename){
      console.log("working")
      console.log(filename)

      this.documentsService.getSignedForm(filename).subscribe(
        res => {
          console.log(res)
          this.blob = new Blob([res], { type: "application/pdf"});
          this.fileurl = URL.createObjectURL(this.blob);
      this.blob = this.getSafeUrl( this.fileurl)
          this.viewPDF(this.blob,filename)
          console.log(res)
        },
        error => {
          console.log(error)

        }
      )
    }
    getSafeUrl(fileName) {    
      return this.sanitizer.bypassSecurityTrustResourceUrl(fileName);
    }
    async viewPDF(blob,filename) {
      const modal = await this.modalController.create({
        component: PDFViewPage,
        cssClass: 'my-custom-modal-css',
        componentProps: {
          'blob': blob,
          'filename': filename,
          
        }
      });
      return await modal.present();
    }

}
