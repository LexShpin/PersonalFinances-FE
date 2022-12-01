import { DashboardComponent } from './../../dashboard/dashboard.component';
import { User } from './../../user';
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

  constructor(private authService: AuthService, private router: Router, private dashboardComponent: DashboardComponent) {}

  public onLogin(loginForm: NgForm): void {
    console.log(loginForm.value);
    document.getElementById('loginForm')?.click();
    this.authService.login(loginForm.value).subscribe(
      (response: User) => {
        console.log(response);
        localStorage.setItem('user', JSON.stringify(response));
        console.log(response.balance);
        this.router.navigate(['dashboard']);
        loginForm.reset();
      },
      (error) => {
        loginForm.reset();
      }
    )
  }
}
