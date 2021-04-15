import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {
  loading
  isLoading = false;
  constructor(public loadingController : LoadingController){

  }

  async startLoading() {
    this.isLoading = true;
    this.loading = await this.loadingController.create({
   
      message: 'Por favor espere...',
      translucent: false,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: false
    });
    await this.loading.present().then(() => {
      console.log('presented');
      if (!this.isLoading) {
        this.loading.dismiss().then(() => console.log('abort presenting'));
      }
    });
  }
  async stopLoading() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
    
    
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
    await loading.present().then();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }

  
}
