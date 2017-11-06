import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { constants } from '../../environments/constants';

import 'rxjs/add/operator/toPromise';

import { OrderModel } from '../models/order.model';

@Injectable()
export class OrderService {

    private publicUrl = environment.webServiceBaseUrl + constants.orderApi.publicUrl;
    private privateUrl = environment.webServiceBaseUrl + constants.orderApi.privateUrl;
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getUserOrders(): Promise<OrderModel[]> {
        return this.http.get(this.privateUrl)
            .toPromise()
            .then(response => response.json() as OrderModel[])
            .catch(this.handleError);
    }

    public createNewOrder(order: OrderModel): Promise<OrderModel> {
        const options = {
            order: order
        };
        return this.http.post(this.privateUrl, options)
            .toPromise()
            .then(response => response.json() as OrderModel)
            .catch(this.handleError);
    }

    public updateOrderStatus(orderId: number, newStatus: string): Promise<boolean>{
        const options = {
            status: newStatus
        };
        return this.http.put(`${this.privateUrl}/${orderId}`, options)
            .toPromise()
            .then(response => response)
            .catch(this.handleError);
    }


    // ---------------- PRIVATE ----------------
    private handleError(error: any): Promise<any> {
        console.error('An error occured', error); // for demo purpose only.
        return Promise.reject(error.message || error);
    }
}
