import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) {}

  public onLogin(loginForm: NgForm): void {
    console.log(loginForm.value);
    document.getElementById('loginForm')?.click();
    this.authService.login(loginForm.value).subscribe(
      (response) => {
        this.router.navigate(['dashboard']);
        loginForm.reset();
      },
      (error) => {
        loginForm.reset();
      }
    )
  }
}
