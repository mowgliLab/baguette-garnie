import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { constants } from '../../environments/constants';

import 'rxjs/add/operator/toPromise';

import { ToppingModel } from '../models/topping.model';

@Injectable()
export class ToppingService {

    private baseUrl = environment.webServiceBaseUrl + constants.toppingApi.baseUrl;
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getToppings(): Promise<Array<ToppingModel>> {
        return this.http.get(this.baseUrl)
            .toPromise()
            .then(response => response.json() as Array<ToppingModel>)
            .catch(this.handleError);
    }
    
    // ---------------- PRIVATE ----------------
    private handleError(error: any): Promise<any> {
        console.error('An error occured', error); // for demo purpose only.
        return Promise.reject(error.message || error);
    }
}
