import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { constants } from '../../environments/constants';

import 'rxjs/add/operator/toPromise';

import { BreadModel } from '../models/bread.model';

@Injectable()
export class BreadService {

    private baseUrl = environment.webServiceBaseUrl + constants.breadApi.baseUrl;
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getBreads(): Promise<Array<BreadModel>> {
        return this.http.get(this.baseUrl)
            .toPromise()
            .then(response => response.json() as Array<BreadModel>)
            .catch(this.handleError);
    }

    // ---------------- PRIVATE ----------------
    private handleError(error: any): Promise<any> {
        console.error('An error occured', error); // for demo purpose only.
        return Promise.reject(error.message || error);
    }
}
