import { TransactionsService } from './../transactions/transactions.service';
import { Observable } from 'rxjs';
import { User } from './../user';
import { DashboardService } from './dashboard.service';
import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '../transactions/transaction';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class DashboardComponent implements OnInit {

  public user: User;
  public balance: number;
  public someVar = 'variable';
  public transactions: Transaction[];

  constructor(private dashboardService: DashboardService, private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.displayRecentUserTransactions();
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

  public onUpdateBalance(updateBalanceForm: NgForm): void {
    this.user.balance = updateBalanceForm.value['number'];
    console.log(this.user);
    this.dashboardService.updateBalance(this.user).subscribe(
      (response) => {
        updateBalanceForm.reset();
        console.log(response);
        console.log(updateBalanceForm.value['number']);
        console.log(typeof updateBalanceForm.value['number']);
      },
      (error) => {
        updateBalanceForm.reset();
        console.log(error.message);
        console.log(updateBalanceForm.value['number']);
      }
    )
  }

  public onOpenModal(): void {
    const container = document.getElementById('main-container');

    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#updateBalanceModal');

    container?.appendChild(button);
    button.click();
  }

  public displayRecentUserTransactions(): void {
    this.transactionsService.getAllUserTransactions(this.user.username).subscribe(
      (response) => {
        this.transactions = response;
      },
      (error) => {
        console.log(error.message);
      }
    )
  }
}
