import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DocumentGeneratorPage } from './document-generator.page';
import { FormTextPipe } from 'src/app/form-text.pipe';
import {IonicColorPickerModule} from 'ionic-color-picker';
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
    ReactiveFormsModule,
    IonicColorPickerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DocumentGeneratorPage]
})
export class DocumentGeneratorPageModule {}
