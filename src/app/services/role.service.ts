import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  dettachRole(selectedRole,user) {
    const url = environment.apiUrl + "dettachRole" ;
      
    return this.http.post(url,{selectedRole,user});
  }
  assignRole(selectedUser , selectedRole) {
    console.log(selectedUser)
    console.log(selectedRole)
    const url = environment.apiUrl + "attachRole" ;
      
    return this.http.post(url,{selectedUser,selectedRole});
  }
  deleteRole(role) {
    const url = environment.apiUrl + "deleteRole" ;
      
    return this.http.post(url,role);
  }
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
  addRole(name,description){
    const url = environment.apiUrl + "addRole" ;
      
    return this.http.post(url,{name,description});
  }

}
