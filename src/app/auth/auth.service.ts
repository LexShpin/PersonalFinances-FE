import { DashboardComponent } from './../dashboard/dashboard.component';
import { User } from './../user';
import { Registration } from './registration/registration';
import { Login } from './login/login';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private apiServiceUrl = 'http://localhost:8084/auth';

    constructor(private http: HttpClient, private dashboardComponent: DashboardComponent) {}

    public login(login: Login): Observable<User> {
        return this.http.post<User>(`${this.apiServiceUrl}/login`, login);
    }

    public register(registration: Registration): Observable<User> {
        return this.http.post<User>(`${this.apiServiceUrl}/register`, registration);
    }
}