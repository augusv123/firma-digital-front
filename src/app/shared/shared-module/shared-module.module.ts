import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilepipePipe } from 'src/app/filepipe.pipe';
import { FormTextPipe } from 'src/app/form-text.pipe';
import { HasRoleDirective } from 'src/app/has-role.directive';



@NgModule({
  declarations: [FilepipePipe,FormTextPipe,HasRoleDirective],
  
  imports: [
    CommonModule,
  ],
  providers:    [ FilepipePipe ,FormTextPipe],
  exports: [
    FilepipePipe,FormTextPipe,HasRoleDirective
  ]
})
export class SharedModuleModule { }
