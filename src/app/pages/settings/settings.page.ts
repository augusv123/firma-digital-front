import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {
  avatarUrl
  user
  constructor(private authService: AuthService) {}

  ngOnInit() {
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

  logoutAction() {
    this.authService.logout();
  }
}
