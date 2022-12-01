import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class DashboardService {
    private dashoardUrl = 'http://localhost:8084/dashboard';

    constructor(private http: HttpClient) {}
}