import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (!this.authService.isLoggedIn()) {
      let url: string = state.url;
      this.authService.redirectUrl = url;
      this.router.navigate(['/login']);
    }
    
    return this.authService.isLoggedIn();
  }

  canLoad() {
    if (!this.authService.isLoggedIn()) {
    
      this.router.navigate(['/login']);
    }
    return this.authService.isLoggedIn();
  }
 
}
