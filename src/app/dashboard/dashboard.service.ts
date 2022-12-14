import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
    providedIn: 'root'
})

export class DashboardService {
    private dashboardUrl = 'http://localhost:8084/dashboard';

    constructor(private http: HttpClient) {}

    public getDashboard(username: string): Observable<User> {
        return this.http.get<User>(`${this.dashboardUrl}/${username}`);
    }

    public updateBalance(user: User): Observable<User> {
        return this.http.post<User>(`${this.dashboardUrl}/${user.username}/updateBalance`, user);
    }
}