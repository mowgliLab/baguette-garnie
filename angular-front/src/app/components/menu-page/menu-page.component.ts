import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { MenuModel } from '../../models/menu.model';
import { SandwichModel } from '../../models/sandwich.model';
import { SandwichService } from '../../services/sandwich.service';
import * as _ from 'lodash';
import { OrderedSandwichModel, OrderModel } from '../../models/order.model';
import { MemoryService } from '../../services/memory.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-menu-page',
    templateUrl: './menu-page.component.html',
    styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent implements OnInit {

    menu: MenuModel;
    selectedSandwich: SandwichModel;
    availlableSize = [];

    orderForm: FormGroup;
    orderedSandwich: OrderedSandwichModel;
    currentOrder: OrderModel;

    constructor(private menuService: MenuService,
                private sandwichService: SandwichService,
                private memoryService: MemoryService,
                private formBuilder: FormBuilder) {
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

    showDetails(sandwich: SandwichModel, modalTemplate: any) {
        if (sandwich) {
            this.selectedSandwich = sandwich;
            this.sandwichService.getSandwich(this.selectedSandwich.id)
                .then(sandwichRes => _.merge(this.selectedSandwich, sandwichRes));
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
                });
        }
        modalTemplate.show();
    }

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

    submitForm(value: any): void {
        console.log('Reactive Form Data: ');
        console.log(value);
    }
}
