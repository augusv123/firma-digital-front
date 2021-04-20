import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FormCompletionPage } from './form-completion.page';
import { Share } from '@capacitor/core';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { FormTextPipe } from 'src/app/form-text.pipe';

const routes: Routes = [
  {
    path: '',
    component: FormCompletionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModuleModule,
    FormsModule,
    SharedModuleModule,
    IonicModule,
    ReactiveFormsModule,

    RouterModule.forChild(routes)
  
  ],
  declarations: [FormCompletionPage],

})
export class FormCompletionPageModule {}
