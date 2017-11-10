import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { MenuService } from '../../services/menu.service';
import { SandwichService } from '../../services/sandwich.service';
import { MemoryService } from '../../services/memory.service';

import { MenuModel } from '../../models/menu.model';
import { SandwichModel } from '../../models/sandwich.model';
import { OrderedSandwichModel, OrderModel } from '../../models/order.model';
import { SandwichUtil } from '../../utils/sandwich.util';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu-page',
    templateUrl: './menu-page.component.html',
    styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent implements OnInit {

    menu: MenuModel;
    selectedSandwich: SandwichModel;
    availlableSize = [];
    orderedSandwich: OrderedSandwichModel;
    currentOrder: OrderModel;
    totalOrderRowPrice: number;

    orderForm: FormGroup;

    constructor(private menuService: MenuService,
                private sandwichService: SandwichService,
                private memoryService: MemoryService,
                private formBuilder: FormBuilder,
                private router: Router) {
        this.orderForm = formBuilder.group({
            quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
            sandwichSize: 1
        });
    }

    ngOnInit() {
        this.menuService.getMenu()
            .then(menu => {
                console.log('getMenu end', menu);
                this.menu = menu;
            });
        this.availlableSize = SandwichModel.sizeValues;
        this.memoryService.currentOrder.subscribe(order => this.currentOrder = order);
    }


    // *********************************
    // Elements clicks
    // *********************************
    showDetails(sandwich: SandwichModel, modalTemplate: any) {
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


    // *********************************
    // Manage Customization of current Sandwich
    // *********************************
    customizeCustomSandwich() {
        const customizableSandwich = Object.assign({}, this.selectedSandwich);
        customizableSandwich.id = null;
        this.memoryService.setCustomSandwich(customizableSandwich);
        this.router.navigate(['/custom']);
    }
}
