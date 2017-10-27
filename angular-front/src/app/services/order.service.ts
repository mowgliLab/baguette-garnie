import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { constants } from '../../environments/constants';

import 'rxjs/add/operator/toPromise';

import { OrderModel } from '../models/order.model';

@Injectable()
export class OrderService {

    private baseUrl = environment.webServiceBaseUrl + constants.orderApi.baseUrl;
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getUserOrders(): Promise<OrderModel[]> {
        return this.http.get(this.baseUrl)
            .toPromise()
            .then(response => response.json() as OrderModel[])
            .catch(this.handleError);
    }


    // ---------------- PRIVATE ----------------
    private handleError(error: any): Promise<any> {
        console.error('An error occured', error); // for demo purpose only.
        return Promise.reject(error.message || error);
    }
}
