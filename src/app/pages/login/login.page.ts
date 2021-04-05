import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from '../../config/auth-constants';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  postData = {
    userName: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService
  ) {}

  ngOnInit() {}

  validateInputs() {
    let userName = this.postData.userName.trim();
    let password = this.postData.password.trim();
    return (
      this.postData.userName &&
      this.postData.password &&
      userName.length > 0 &&
      password.length > 0
    );
  }

  loginAction() {
    if (this.validateInputs()) {
      this.authService.login(this.postData).subscribe(
        (res: any) => {
          if (res.token) {
            // Storing the User data.
            localStorage.setItem('user', JSON.stringify(res));
            localStorage.setItem('token', res.token);
            localStorage.setItem('avatarUrl', res.profile_photo_url);
            this.authService.storeUserSubject(res)
            this.storageService
              .store(AuthConstants.AUTH, res)
              .then(res => {
           
                if ( this.authService.redirectUrl && this.authService.redirectUrl != "/login") {
                  console.log(this.authService.redirectUrl)
                  this.router.navigate([this.authService.redirectUrl]);
                  this.authService.redirectUrl = null;
                }
                else{
                  this.router.navigate(['/home']);
          
                }
              });
          } else {
            this.toastService.presentToast('Incorrect email and password.');
          }
        },
        (error: any) => {
          // this.toastService.presentToast('Network Issue.');
          this.toastService.presentToast(error.message);
          
          console.log(error)
        }
      );
    } else {
      this.toastService.presentToast(
        'Please enter email/email or password.'
      );
    }
  }
}
