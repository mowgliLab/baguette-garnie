import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';

import { SandwichModel } from '../models/sandwich.model';
import { constants } from '../../environments/constants';

@Injectable()
export class SandwichService {

    private publicUrl = environment.webServiceBaseUrl + constants.sandwichApi.publicUrl;
    private privateUrl = environment.webServiceBaseUrl + constants.sandwichApi.privateUrl;
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {
    }

    getSandwich(id: number): Promise<SandwichModel> {
        return this.http.get(`${this.publicUrl}/${id}`)
            .toPromise()
            .then(response => response.json() as SandwichModel)
            .catch(this.handleError);
        // return Promise.resolve(SANDWICH);
    }

    public saveCustomSandwich(sandwich: SandwichModel): Promise<SandwichModel> {
        return this.http
            .post(`${this.privateUrl}/custom`, JSON.stringify({sandwich: sandwich}), {withCredentials: true, headers: this.headers})
            .toPromise()
            .then(res => res.json());
    }

    // ---------------- PRIVATE ----------------
    private handleError(error: any): Promise<any> {
        console.error('An error occured', error); // for demo purpose only.
        return Promise.reject(error.message || error);
    }
}
