import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { MenuModel } from '../../models/menu.model';
import { SandwichModel } from '../../models/sandwich.model';
import { SandwichService } from '../../services/sandwich.service';
import * as _ from 'lodash';
import { BreadModel } from '../../models/bread.model';
import { ToppingModel } from '../../models/topping.model';

@Component({
    selector: 'app-menu-page',
    templateUrl: './menu-page.component.html',
    styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent implements OnInit {

    menu: MenuModel;
    selectedSandwich: SandwichModel;
    availlableBreads: BreadModel[];
    availlableToppings: ToppingModel[];
    availlableSize: any;

    constructor(
        private menuService: MenuService,
        private sandwichService: SandwichService
    ) { }

    ngOnInit() {
        this.menuService.getMenu()
            .then(menu => {
                console.log('getMenu end', menu);
                this.menu = menu;
            });
        this.availlableSize = SandwichModel.sizeValues;
    }

    openCustomSandwichEditor(event: any) {
        event.stopPropagation();
        alert('open editor');
        return false;
    }

    showDetails(sandwich: SandwichModel, modalTemplate: any) {
        if (sandwich) {
            this.selectedSandwich = sandwich;
            this.sandwichService.getSandwich(this.selectedSandwich.id)
                .then(sandwich => _.merge(this.selectedSandwich, sandwich));
        }
        modalTemplate.show();
    }

    addOrder(sandwich: SandwichModel, modalTemplate: any) {
        if (sandwich) {
            this.selectedSandwich = sandwich;
            this.sandwichService.getSandwich(this.selectedSandwich.id)
                .then(sandwich => _.merge(this.selectedSandwich, sandwich));
        }
        modalTemplate.show();
    }
}
