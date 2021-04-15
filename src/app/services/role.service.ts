import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  getUsersWithRoles() {
    const url = environment.apiUrl + "getUsersWithRoles" ;
      
    return this.http.get(url);
  }
  constructor(private http : HttpClient){

  }
  getRoles() {
      const url = environment.apiUrl + "getAllRoles" ;
      
      return this.http.get(url);
  }

}
