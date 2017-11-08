import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { constants } from '../../environments/constants';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) {
    }

    private baseUrl = environment.webServiceBaseUrl + constants.authApi.publicUrl;
    private headers = new Headers({'Content-Type': 'application/json'});

    login(username: string, password: string): Observable<boolean> {
        return this.http.post(`${this.baseUrl}/login`, JSON.stringify({
            mail: username,
            password: password
        }), {withCredentials: true, headers: this.headers})
            .map((response: Response) => response.json());
    }

    logout(): Observable<any> {
        return this.http.get(`${this.baseUrl}/logout`, {withCredentials: true})
            .map(response => response);
    }

    checkSessionValidity(): Observable<boolean> {
        return this.http.get(`${this.baseUrl}/check`, {withCredentials: true})
            .map((response: any) => response.json().status);
    }
}
