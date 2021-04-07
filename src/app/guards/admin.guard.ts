import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { resolve } from 'url';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  
  canActivate(): any {

    if(this.authService.hasRoles(['admin'])){
      console.log("permission granted")
      return true
    }
    else{
      this.authService.logout()
      console.log("permission denied")
      this.router.navigate(['login']);
      return false

    }

   
  }
  
}
