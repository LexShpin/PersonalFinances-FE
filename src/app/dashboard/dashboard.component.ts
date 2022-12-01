import { Observable } from 'rxjs';
import { User } from './../user';
import { DashboardService } from './dashboard.service';
import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '../transactions/transaction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class DashboardComponent implements OnInit {
  private dashboardUrl = 'http://localhost:8084/dashboard';
  
  public user: User;
  public balance: number;
  public someVar = 'variable';
  public transactions: Transaction[];

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.dashboardService.getDashboard(this.user.username).subscribe(
      (response) => {
        this.user = response;
        console.log(response);
        this.balance = response.balance;
      },
      (error) => {
        console.log(error);
      }
    )
    console.log(this.user.balance);
    console.log('loaded');
  }

  constructor(private http: HttpClient, private router: Router, private dashboardService: DashboardService) {}
}
