import { Component, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';

import { MemoryService } from '../../services/memory.service';

import { OrderedSandwichModel, OrderModel } from '../../models/order.model';
import { SandwichModel } from '../../models/sandwich.model';
import { OrderUtil } from '../../utils/order.util';
import { SandwichUtil } from '../../utils/sandwich.util';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { AlertService } from '../../services/alert.service';


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
                private route: Router,
                private alertService: AlertService,
                private router: Router) {
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
        if (this.isLoggedIn) {
            this.orderService.createNewOrder(this.currentOrder)
                .then(res => {
                    if (res) {
                        this.memoryService.setOrder(res);
                        this.route.navigate(['confirm']);
                        this.alertService.success('Votre commande a été passée et attend votre finalisation.');
                    } else {
                        // Affichage de l'alert pour signaler l'erreur.
                        // this.alertService.error('Une erreur est survenue. Veuillez réessayer plus tard.');
                    }
                }).catch(err => {
                this.alertService.error('Une erreur est survenue. Veuillez réessayer plus tard.');
            });
        } else {
            // If user is not loged in, redirect him to login page with param to get back to order page.
            this.router.navigate(['/login'], { queryParams: { returnUrl: '/order' }});
        }
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
