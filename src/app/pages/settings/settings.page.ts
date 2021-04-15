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
        console.log(res)
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
        
        console.log(res)
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
}
