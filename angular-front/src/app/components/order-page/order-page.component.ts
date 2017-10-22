import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../../models/order.model';
import { MemoryService } from '../../services/memory.service';
import { SandwichModel } from '../../models/sandwich.model';

@Component({
    selector: 'app-order-page',
    templateUrl: './order-page.component.html',
    styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

    availlableSize = [];
    currentOrder: OrderModel;
    orderedSandwichCount: number;

    constructor(private memoryService: MemoryService) {
    }

    ngOnInit() {
        this.availlableSize = SandwichModel.sizeValues;
        this.memoryService.currentOrder.subscribe(order => this.currentOrder = order);
        this.memoryService.orderSandwichesCount.subscribe(count => this.orderedSandwichCount = count);
    }

    updateQuantity() {
        console.log(this.currentOrder);
    }
}
