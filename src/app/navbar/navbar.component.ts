import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  public currentUser: User;
  
  constructor(private authService: AuthService, private router: Router) {}

  public onLogout() {
    this.currentUser = JSON.parse(localStorage.getItem('user')!);
    this.authService.logout().subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['login']);
        localStorage.clear();
      },
      (error) => {
        console.log(error.message);
      }
    )
  }
}
