import { Component, OnInit } from '@angular/core';
import { SandwichModel } from '../../models/sandwich.model';
import { UserService } from '../../services/user.service';
import { SandwichService } from '../../services/sandwich.service';
import { OrderedSandwichModel, OrderModel } from '../../models/order.model';
import { SandwichUtil } from '../../utils/sandwich.util';
import * as _ from 'lodash';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MemoryService } from '../../services/memory.service';

@Component({
    selector: 'app-my-sandwiches-page',
    templateUrl: './my-sandwiches-page.component.html',
    styleUrls: ['./my-sandwiches-page.component.css']
})
export class MySandwichesPageComponent implements OnInit {

    sandwiches: SandwichModel[];
    selectedSandwich: SandwichModel;
    orderedSandwich: OrderedSandwichModel;
    totalOrderRowPrice: number;
    currentOrder: OrderModel;
    availlableSize = [];

    orderForm: FormGroup;

    constructor(private userService: UserService,
                private sandwichService: SandwichService,
                private formBuilder: FormBuilder,
                private memoryService: MemoryService) {
        this.orderForm = formBuilder.group({
            quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
            sandwichSize: 1
        });
    }

    ngOnInit() {
        this.availlableSize = SandwichModel.sizeValues;
        this.memoryService.currentOrder.subscribe(order => this.currentOrder = order);
        this.userService.getUserSandwiches()
            .then(sandwiches => {
                console.log(sandwiches);
                this.sandwiches = sandwiches;
            });
    }


    // *********************************
    // Elements clicks
    // *********************************
    showDetails(sandwich: SandwichModel, modalTemplate: any) {
        event.stopPropagation();
        if (sandwich) {
            this.selectedSandwich = sandwich;
            this.sandwichService.getSandwich(this.selectedSandwich.id)
                .then(sandwichRes => {
                    _.merge(this.selectedSandwich, sandwichRes);
                });
        }
        modalTemplate.show();
    }

    openAddOrder(sandwich: SandwichModel, modalTemplate: any) {
        event.stopPropagation();
        if (sandwich) {
            this.selectedSandwich = sandwich;
            this.sandwichService.getSandwich(this.selectedSandwich.id)
                .then(sandwichRes => {
                    _.merge(this.selectedSandwich, sandwichRes);
                    this.orderedSandwich = Object.assign(new OrderedSandwichModel(), sandwichRes);
                    this.totalOrderRowPrice = SandwichUtil.computeSandwichPriceFromFullPrice(this.orderedSandwich, 1) * 1;
                });
        }
        modalTemplate.show();
    }

    // *********************************
    // Manage Order
    // *********************************
    addToOrder(value: any, modalTemplate: any) {
        console.log(this.orderedSandwich);
        this.orderedSandwich.quantity = value.quantity;
        this.orderedSandwich.sandwichSize = value.sandwichSize;

        this.currentOrder.sandwiches.push(this.orderedSandwich);
        this.memoryService.setOrder(this.currentOrder);

        this.selectedSandwich = undefined;
        modalTemplate.hide();
        console.log(this.currentOrder);
    }

    // *********************************
    // Manage computed values to display
    // *********************************
    computeTotalPrice(value: any) {
        this.totalOrderRowPrice = SandwichUtil.computeSandwichPriceFromFullPrice(this.orderedSandwich, value.sandwichSize) * value.quantity;
    }

}
