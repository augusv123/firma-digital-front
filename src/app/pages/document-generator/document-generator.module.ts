import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import localeEsAr from '@angular/common/locales/es-AR';

import { DocumentGeneratorPage } from './document-generator.page';
import { FormTextPipe } from 'src/app/form-text.pipe';
import {IonicColorPickerModule} from 'ionic-color-picker';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
const routes: Routes = [
  {
    path: '',
    component: DocumentGeneratorPage
  },
  {
    path: '/:documentId',
    component: DocumentGeneratorPage
  },

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModuleModule,
    ReactiveFormsModule,
    IonicColorPickerModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    {
      provide: localeEsAr, useValue: 'es-AR'
   },
  ],
  declarations: [DocumentGeneratorPage]
})
export class DocumentGeneratorPageModule {}
