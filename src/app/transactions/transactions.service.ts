import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "../user";
import { Transaction } from "./transaction";

@Injectable({
    providedIn: 'root'
})

export class TransactionsService {
    private transactionsUrl = 'http://localhost:8084/transactions';

    constructor(private http: HttpClient, private router: Router) {}

    public getAllUserTransactions(username: string): Observable<Transaction[]> {
        return this.http.get<Transaction[]>(`${this.transactionsUrl}/${username}`);
    }

    public addTransaction(username: string, addTransactionForm: NgForm): Observable<Transaction> {
        return this.http.post<Transaction>(`${this.transactionsUrl}/${username}/create`, addTransactionForm);
    }

    public editTransaction(username: string, editTransactionForm: NgForm, id: number): Observable<Transaction> {
        return this.http.patch<Transaction>(`${this.transactionsUrl}/${username}/${id}/update`, editTransactionForm);
    }

    public deleteTransaction(username: string, id: number): Observable<void> {
        return this.http.delete<void>(`${this.transactionsUrl}/${username}/${id}/delete`);
    }
}