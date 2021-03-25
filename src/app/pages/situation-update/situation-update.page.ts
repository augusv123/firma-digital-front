import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/form.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-situation-update',
  templateUrl: './situation-update.page.html',
  styleUrls: ['./situation-update.page.scss'],
})
export class SituationUpdatePage implements OnInit {

  constructor(private formService : FormService ,private toastService : ToastService) { }

  ngOnInit() {
  }
  signAndSend(formhtml){
    console.log(formhtml)
    const form = formhtml
    this.formService.sendHtmlTest(form).subscribe(
      (res: any) => { 
        console.log(res)
        this.downLoadFile(res, "application/pdf","pdf")
     
      },
      (error: any) => {
        this.toastService.presentToast('Network Issue.');
      }
    );
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
