import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilepipePipe } from 'src/app/filepipe.pipe';



@NgModule({
  declarations: [FilepipePipe],
  imports: [
    CommonModule
  ],
  providers:    [ FilepipePipe ],
  exports: [
    FilepipePipe,
  ]
})
export class SharedModuleModule { }
