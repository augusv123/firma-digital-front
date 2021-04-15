import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FormsPage } from './forms.page';
import { FormTextPipe } from 'src/app/form-text.pipe';
import { VacacionesPage } from '../vacaciones/vacaciones.page';
import { PerformancePage } from '../performance/performance.page';
import { SituationUpdatePage } from '../situation-update/situation-update.page';
import { FilepipePipe } from 'src/app/filepipe.pipe';
import { SharedModuleModule } from 'src/app/shared/shared-module/shared-module.module';
import { FormCompletionPage } from '../form-completion/form-completion.page';

const routes: Routes = [
  {
    path: '',
    component: FormsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModuleModule,
    ReactiveFormsModule,
    
    RouterModule.forChild(routes)
  ],
  declarations: [FormsPage,FormTextPipe,VacacionesPage,PerformancePage,SituationUpdatePage,FormCompletionPage ],
  providers:    [ FormTextPipe ],
  
})
export class FormsPageModule {}
