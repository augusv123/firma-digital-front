import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HasRoleDirective } from '../has-role.directive';
import { HomePage } from './home.page';
import { HomeRouter } from './home.router';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomeRouter],
  declarations: [HomePage, HasRoleDirective]
})
export class HomePageModule {}