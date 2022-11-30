import { Registration } from './registration/registration';
import { Login } from './login/login';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private apiServiceUrl = 'http://localhost:8084/auth';

    constructor(private http: HttpClient) {}

    public login(login: Login) {
        return this.http.post(`${this.apiServiceUrl}/login`, login);
    }

    public register(registration: Registration) {
        return this.http.post(`${this.apiServiceUrl}/register`, registration);
    }
}