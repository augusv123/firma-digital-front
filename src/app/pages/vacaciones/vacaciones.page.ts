import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { VacacionesService } from 'src/app/services/vacaciones.service';

@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.page.html',
  styleUrls: ['./vacaciones.page.scss'],
})
export class VacacionesPage implements OnInit {
  postData = {
    licencia: '',
    anual: '',
    desde: '',
    hasta: '',
    reincorporacion: '',
  };
  constructor(private toastService : ToastService, private vacacionesService : VacacionesService) {

    
   }

  ngOnInit() {
  }
  signAndSend(){
    
    // this.vacacionesService.requestVacations(this.postData).subscribe(
    //   (res: any) => { 
    //     this.downLoadFile(res, "application/pdf","pdf")
     
    //   },
    //   (error: any) => {
    //     this.toastService.presentToast('Network Issue.');
    //   }
    // );
  }
   formatDate(dateTime) {
    var date: Date = new Date(dateTime);
    var dia =  date.getDate();
    var mes =  date.getMonth() +1;
    var año =  date.getFullYear();

    return dia+"/"+mes+"/"+año;
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
