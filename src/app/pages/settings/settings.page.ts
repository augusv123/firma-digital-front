import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {
  avatarUrl
  user
  users
  roles
  hasAdminRole 
  filteredUsers
  filter
  newName
  newDescription
  selectedRole
  constructor(private authService: AuthService, private roleService  :RoleService) {}

  ngOnInit() {
    this.authService.isAdmin().subscribe(
      res => {
        this.hasAdminRole = res
      }
    )
    this.getRoles()
    this.getUsersWithRoles()
    this.authService.getUserSubject().subscribe(
      res => {
        this.user = res
        
      },
      error => {
        console.log(error)
      }
    )
    this.avatarUrl = localStorage.getItem('avatarUrl')

  }
  getRoles() {
    this.roleService.getRoles().subscribe(
      res => {
        this.roles = res
      },
      error => {
      console.log(error)}
    )
  }
  getUsersWithRoles(){
    this.roleService.getUsersWithRoles().subscribe(
      res => {
        this.users  = res
        this.filteredUsers = res
        
      },
      error => {
      console.log(error)}
    )
  }

  logoutAction() {
    this.authService.logout();
  }
  searchAndFilterItems() {
    
    // const filteredItems = this.users.filter(item => {
    //     // Apply filters
    // });
    this.filteredUsers  = this.users.filter(item => {
      return item.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1;
    });
  }
  isAdmin(){
    return this.hasAdminRole
  }
  deleteRole(id){
    this.roleService.deleteRole(id).subscribe(
      res => {
      this.getRoles()
      this.getUsersWithRoles()

      },
      error=> console.log(error)
    )
  }

addRole(){
  this.roleService.addRole(this.newName,this.newDescription).subscribe(
    res => {
      this.getRoles()
    },
    error=> console.log(error)
  )
}
assignRole(user){
  this.roleService.assignRole(user.id,user.selectedRole).subscribe(
    res => {
      console.log(res)
      this.getUsersWithRoles()
    },
    error=> console.log(error)
  )
}
dettach(userRole,user){
  this.roleService.dettachRole(userRole.name,user.id).subscribe(
    res => {
      console.log(res)
      this.getUsersWithRoles()
    },
    error=> console.log(error)
  )
}
}

