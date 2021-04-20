import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModuleModule } from '../shared/shared-module/shared-module.module';

import { HomePage } from './home.page';
import { HomeRouter } from './home.router';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomeRouter,SharedModuleModule],
  declarations: [HomePage]
})
export class HomePageModule {}