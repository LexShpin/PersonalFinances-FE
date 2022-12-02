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

    public addTransaction(addTransactionForm: NgForm): Observable<Transaction> {
        return this.http.post<Transaction>(`${this.transactionsUrl}/create`, addTransactionForm);
    }

    public editTransaction(editTransactionForm: NgForm, id: number): Observable<Transaction> {
        return this.http.post<Transaction>(`${this.transactionsUrl}/${id}/update`, editTransactionForm);
    }
}