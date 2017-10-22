import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrderedSandwichModel, OrderModel } from '../../models/order.model';
import { MemoryService } from '../../services/memory.service';
import { SandwichModel } from '../../models/sandwich.model';
import { OrderUtil } from '../../utils/order.util';
import * as _ from 'lodash';

@Component({
    selector: 'app-order-page',
    templateUrl: './order-page.component.html',
    styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

    availlableSize = [];
    currentOrder: OrderModel;
    orderedSandwichCount: number;
    isLoggedIn: boolean;
    hasError: boolean;

    constructor(private memoryService: MemoryService,
                private ref: ChangeDetectorRef) {
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

    updateOrder() {
        this.memoryService.setOrder(this.currentOrder);
    }

    get orderPrice() {
        return OrderUtil.computeOrderPrice(this.currentOrder);
    }

    get totalSandwiches() {
        return OrderUtil.computeTotalOrderedSandwiches(this.currentOrder);
    }

    removeSandwich(sandwich: OrderedSandwichModel) {
        _.remove(this.currentOrder.sandwiches, s => s === sandwich);
        this.updateOrder();
    }

    postOrder() {
        console.log('appel de la fonction pour créer lorder', this.currentOrder);
    }
}
