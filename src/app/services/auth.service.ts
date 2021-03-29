import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthConstants } from './../config/auth-constants';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData$ = new BehaviorSubject<any>([]);
  currentUser : BehaviorSubject<any> =new BehaviorSubject(null);
  public redirectUrl: string;
  
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
  ) {}

  getUserData() {
    this.storageService.get(AuthConstants.AUTH).then(res => {
      this.userData$.next(res);
    });
  }

  login(postData: any): Observable<any> {
    return this.httpService.post('login', postData);
  }

  signup(postData: any): Observable<any> {
    return this.httpService.post('register', postData);
  }

  logout() {
    console.log("loggin out...")
    this.storageService.clear();
    localStorage.clear()
    this.userData$.next('');
    this.currentUser.next(null);
    this.router.navigate(['']);
  }

  storeUserSubject(user){
    this.currentUser.next(user)
    console.log(this.currentUser)
  
  }
  getUserSubject(){
    return this.currentUser.asObservable();
  }
 

  hasRoles(roles : String[]): boolean{
 
    // for(const oneRole of roles){
    //   if(!this.currentUser || !this.currentUser.getValue().rolenames.includes(oneRole)){
    //     console.log("true")
    //     return false

    //   }
    //   console.log("false")
    //   return true
    // }
    for( const oneRole of roles){
      if(!this.currentUser.getValue() || !JSON.parse(this.currentUser.getValue()).rolenames.includes(oneRole)){
        return false;

      }

    }

    return true;

  }
  refreshUserData() {
    var user = localStorage.getItem('user')
    this.currentUser.next(user);
    // this.storageService.get(AuthConstants.USER).then(res => {
    //   console.log(res)


    // });

  }
  isLoggedIn() {
    return !!this.getJwtToken();
  }
  getJwtToken() {
    return localStorage.getItem('token');
  }
}
