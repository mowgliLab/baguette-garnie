import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { constants } from '../../environments/constants';

import 'rxjs/add/operator/toPromise';

import { UserModel } from '../models/user.model';
import { SandwichModel } from '../models/sandwich.model';

@Injectable()
export class UserService {
    constructor(private http: Http) {
    }

    private publicUrl = environment.webServiceBaseUrl + constants.userApi.publicUrl;
    private privateUrl = environment.webServiceBaseUrl + constants.userApi.privateUrl;
    private headers = new Headers({'Content-Type': 'application/json'});

    public register(user: UserModel) {
        return this.http
            .post(`${this.publicUrl}/register`, {user: user}, {headers: this.headers})
            .map(response => response.json());
    }

    public getUserSandwiches(): Promise<Array<SandwichModel>> {
        return this.http
            .get(`${this.privateUrl}/sandwiches`, {withCredentials: true})
            .toPromise()
            .then(res => res.json());
    }

}
