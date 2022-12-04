import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  public date: Date;
  public selectedCategory: string;
  public currentTransaction: Transaction;
  public categories: [];

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.date = new Date();
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.onLoadTransactions();
  }

  public onLoadTransactions(): void {
    this.transactionsService.getAllUserTransactions(this.user.username).subscribe(
      (response) => {
        this.transactions = response;
      },
      (error) => {
        console.log(error.message);
      }
    )
  }

  public onAddTransaction(addTransactionForm: NgForm): void {
    this.transactionsService.addTransaction(addTransactionForm.value).subscribe(
      (response) => {
        this.onLoadTransactions();
        addTransactionForm.reset();
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public onEditTransaction(editTransactionForm: NgForm): void {
    this.transactionsService.editTransaction(editTransactionForm.value, this.currentTransaction.id).subscribe(
      (response) => {
        this.onLoadTransactions();
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  public onDeleteTransaction(id: number): void {
    this.transactionsService.deleteTransaction(id).subscribe(
      (response) => {
        this.onLoadTransactions();
        console.log(response);
      },
      (error) => {
        console.log(error.message);
      }
    )
  }

  public onSelectCategory(value: string): void {
    this.selectedCategory = value;
  }

  public onOpenModal(transaction: Transaction, mode: string): void {
    const container = document.getElementById('main-container');

    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if (mode === 'edit') {
      this.currentTransaction = transaction;
      button.setAttribute('data-bs-target', '#editTransactionModal');
    }
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addTransactionModal');
    }
    if (mode === 'delete') {
      this.currentTransaction = transaction;
      button.setAttribute('data-bs-target', '#deleteTransactionModal')
    }

    container?.appendChild(button);
    button.click();
  }

}
