import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-options-page',
  templateUrl: './options-page.page.html',
  styleUrls: ['./options-page.page.scss'],
})
export class OptionsPagePage implements OnInit {
  // Data passed in by componentProps
  @Input() input: any;

  constructor(private modalCtrl : ModalController) { }

  ngOnInit() {
    console.log(this.input.type)
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
