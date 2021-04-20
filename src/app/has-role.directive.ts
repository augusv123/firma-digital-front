import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from './services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {

  @Input('appHasRole') roles: string[]

  constructor(private authService : AuthService, private templateRef : TemplateRef<any> , private viewContainer : ViewContainerRef) { }
  count  = 0
  ngOnInit() {
    console.log("prueba")
    this.authService.getUserSubject().subscribe(res => {

      
      if(this.authService.hasRoles(this.roles)){
        this.count = this.count + 1;
        if(this.count == 1){
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      }
      else{
        console.log("no tiene el rol de admin")
        this.viewContainer.clear()
      }
    })
  }


}
