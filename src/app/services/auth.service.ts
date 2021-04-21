import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
    private router: Router , private http : HttpClient
  ) {}

  getUserData() {
    this.storageService.get(AuthConstants.AUTH).then(res => {
      this.userData$.next(res);
    });
  }

  login(postData: any): Observable<any> {
    return this.httpService.post('login', postData);
  }
  getUsers() {
    const url = environment.apiUrl + "getUsers" ;

    return this.http.get(url,{ } );
  }

  signup(postData: any): Observable<any> {
    return this.httpService.post('register', postData);
  }
  isAdmin(){
    const url = environment.apiUrl + "isAdmin" ;

    return this.http.get(url,{ } );
  }
  hasRole(role){
    const url = environment.apiUrl + "hasRole?role="+role ;

    return this.http.get(url);
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
      if(!this.currentUser.getValue() || !this.currentUser.getValue().rolenames.includes(oneRole)){
        return false;

      }

    }

    return true;

  }
  
  refreshUserData() {
    var user = JSON.parse(localStorage.getItem('user'))
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
