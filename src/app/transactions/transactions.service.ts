import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
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
}