import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PDFViewPage } from 'src/app/pdfview/pdfview.page';
import { AuthService } from 'src/app/services/auth.service';
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
  users
  filter = ""
  filteredUsers
  userSelected
  hasAdminRole= false
  avatarUrl
  constructor(private sanitizer:DomSanitizer,private documentsService: VacacionesService,private route : ActivatedRoute,private authService : AuthService, public modalController : ModalController) { }

  ngOnInit() {
    const filename = this.route.snapshot.paramMap.get('filename');
    console.log(filename)
    this.avatarUrl = localStorage.getItem('avatarUrl')

    console.log(filename)
    console.log()
    this.authService.isAdmin().subscribe(
      res => {
       if(res){
        this.getUsers()
        this.hasAdminRole = true
         
       }
       else{
        this.authService.getUserSubject().subscribe(res => {
         
          // this.getAllSignedFiles(user)
          this.getAllDirectories(res)
          
        },
        error => console.log(error))
       }
      },
      error => {
        console.log(error)
      }
    )
    // if(filename){
    //   this.getSignedForm("public/signedForms/"+filename+".pdf")
   
    // }
    // this.blob = this.getSafeUrl( this.data.fileurl)
    // this.getPDF()
    // this.notifySignature()
    // this.getAllSignedFiles()
 
  }
  // getAllSignedFiles(user){
  //   this.userSelected = user
  //   const id  = user.id
  //   this.documentsService.getAllSignedFiles(id,"asd").subscribe(
  //     res => {
  //       this.signedFiles = res
  //       console.log(res)
  //     },
  //     error => {
  //       console.log(error)
  //     })
  //   }
    getAllDirectories(user){
    this.userSelected = user
    const id  = user.id
    this.documentsService.getAllDirectories(id).subscribe(
      res => {
        this.signedFiles = res
        console.log(res)
      },
      error => {
        console.log(error)
      })
    }
    getSignedForm(filename){
      console.log(filename)

      this.documentsService.getSignedForm(filename).subscribe(
        res => {
          console.log(res)
          this.blob = new Blob([res], { type: "application/pdf"});
          this.fileurl = URL.createObjectURL(this.blob);
      this.blob = this.getSafeUrl( this.fileurl)
      console.log(filename)
          this.viewPDF(this.blob,filename)
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
        // this.viewPDF(this.blob,)

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
  getUsers(){
    this.authService.getUsers().subscribe(
      res => {
        console.log(res)
        this.users = res
        this.filteredUsers = res
      },
      error => {
        console.log(error)
      }
    )
  }
  isAdmin(){
    return this.hasAdminRole
  }
  searchAndFilterItems() {
    
    // const filteredItems = this.users.filter(item => {
    //     // Apply filters
    // });
    this.filteredUsers  = this.users.filter(item => {
      return item.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1;
    });
  }
  reset(){
    this.userSelected = null
    this.selectedFile = null
    this.fetched = false
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
