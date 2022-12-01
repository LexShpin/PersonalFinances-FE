import { DashboardService } from './dashboard.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  private dashboardUrl = 'http://localhost:8084/dashboard';
  
  public username = {};

  constructor(private http: HttpClient) {
    this.http.get(this.dashboardUrl).subscribe(data => this.username = data);
    console.log(this.username);
  }
}
