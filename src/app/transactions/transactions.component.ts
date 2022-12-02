import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { Transaction } from './transaction';
import { TransactionsService } from './transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {
  public user: User;
  public transactions: Transaction[];

  constructor(private router: Router, private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.onLoadTransactions();
  }

  public onLoadTransactions() {
    this.transactionsService.getAllUserTransactions(this.user.username).subscribe(
      (response) => {
        this.transactions = response;
        console.log(response);
      },
      (error) => {
        console.log(error.message);
      }
    )
  }

  public addTransaction() {
    // TODO
  }
}
