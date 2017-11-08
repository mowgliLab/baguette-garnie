import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { constants } from '../../environments/constants';

import 'rxjs/add/operator/toPromise';

import { UserModel } from '../models/user.model';

@Injectable()
export class UserService {
    constructor(private http: Http) {
    }

    private baseUrl = environment.webServiceBaseUrl + constants.userApi.publicUrl;
    private headers = new Headers({'Content-Type': 'application/json'});

    public register(user: UserModel) {
        return this.http
            .post(`${this.baseUrl}/register`, {user: user}, {headers: this.headers})
            .map(response => response.json());
    }

}
