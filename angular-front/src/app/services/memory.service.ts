import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { OrderModel } from '../models/order.model';

import * as _ from 'lodash';

@Injectable()
export class MemoryService {

    private _isLoggedIn = new BehaviorSubject<boolean>(false);
    isLoggedIn = this._isLoggedIn.asObservable();

    private _orderSandwichesCount = new BehaviorSubject<number>(0);
    orderSandwichesCount = this._orderSandwichesCount.asObservable();

    private _currentOrder = new BehaviorSubject<OrderModel>(new OrderModel());
    currentOrder = this._currentOrder.asObservable();

    constructor () { }

    setIsLoggedIn(newValue: boolean) {
        this._isLoggedIn.next(newValue);
    }

    setOrder(order: OrderModel) {
        if (!order) { return; }

        let sandwichCount = 0;
        if (order.sandwiches && order.sandwiches.length >= 0) {
            sandwichCount = _.sumBy(order.sandwiches, s => s.quantity);
        }
        this._currentOrder.next(order);
        this._orderSandwichesCount.next(sandwichCount);
    }
}
