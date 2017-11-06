import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';

import { MemoryService } from '../../services/memory.service';

import { OrderedSandwichModel, OrderModel } from '../../models/order.model';
import { SandwichModel } from '../../models/sandwich.model';
import { OrderUtil } from '../../utils/order.util';
import { SandwichUtil } from '../../utils/sandwich.util';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';


@Component({
    selector: 'app-order-page',
    templateUrl: './order-page.component.html',
    styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
    @ViewChild('orderErrorAlert')orderErrorAlert: any;

    availlableSize = [];

    currentOrder: OrderModel;
    orderedSandwichCount: number;
    isLoggedIn: boolean;
    hasError: boolean;

    constructor(private memoryService: MemoryService,
                private orderService: OrderService,
                private route: Router) {
    }

    ngOnInit() {
        this.availlableSize = SandwichModel.sizeValues;
        this.memoryService.currentOrder.subscribe(order => {
            this.hasError = _.some(order.sandwiches, s => s.quantity < 1);
            this.currentOrder = order;
        });
        this.memoryService.orderSandwichesCount.subscribe(count => this.orderedSandwichCount = count);
        this.memoryService.isLoggedIn.subscribe(res => this.isLoggedIn = res);
    }


    // *********************************
    // Manage Order
    // *********************************
    updateOrder() {
        this.memoryService.setOrder(this.currentOrder);
    }

    removeSandwich(sandwich: OrderedSandwichModel) {
        _.remove(this.currentOrder.sandwiches, s => s === sandwich);
        this.updateOrder();
    }

    postOrder() {
        this.orderService.createNewOrder(this.currentOrder)
            .then(res => {
                if (res) {
                    this.memoryService.setOrder(res);
                    this.route.navigate(['confirm']);
                } else {
                    // Affichage de l'alert pour signaler l'erreur.
                }
            });
    }


    // *********************************
    // Computed values to display
    // *********************************
    get orderPrice() {
        return OrderUtil.computeOrderPrice(this.currentOrder);
    }

    get totalSandwiches() {
        return OrderUtil.computeTotalOrderedSandwiches(this.currentOrder);
    }

    computeRowPrice(sandwich: OrderedSandwichModel): number {
        return SandwichUtil.computeSandwichPriceFromFullPrice(sandwich, sandwich.sandwichSize);
    }
}
