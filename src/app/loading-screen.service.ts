import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {
  loading
  constructor(public loadingController : LoadingController){

  }

  async startLoading() {
    this.loading = await this.loadingController.create({
   
      message: 'Por favor espere...',
      translucent: false,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: false
    });
    await this.loading.present();
  }
  async stopLoading() {
    await this.loading.dismiss();
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Click the backdrop to dismiss early...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }

  
}
