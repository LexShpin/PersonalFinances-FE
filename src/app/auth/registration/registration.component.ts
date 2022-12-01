import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private authService: AuthService, private router: Router) {}

  public onRegister(registrationForm: NgForm): void {
    document.getElementById('registrationForm')?.click();
    this.authService.register(registrationForm.value).subscribe(
      (response) => {
        console.log('Success!');
        registrationForm.reset();
        this.router.navigate(['dashboard']);
      },
      (error) => {
        console.log(error.message);
        registrationForm.reset();
      }
    )
  }
}
