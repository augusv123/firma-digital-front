import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MessagesPage } from './messages.page';
import { FormTextPipe } from 'src/app/form-text.pipe';
import { FilepipePipe } from 'src/app/filepipe.pipe';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';

const routes: Routes = [
  {
    path: '',
    component: MessagesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModuleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MessagesPage],
})
export class MessagesPageModule {}
