import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SignedFilesPage } from './signed-files.page';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';

const routes: Routes = [
  {
    path: '',
    component: SignedFilesPage
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
  declarations: [SignedFilesPage]
})
export class SignedFilesPageModule {}
