import { Component, OnInit } from '@angular/core';
import { ToppingService } from '../../services/topping.service';
import { BreadService } from '../../services/bread.service';
import { BreadModel } from '../../models/bread.model';
import * as _ from 'lodash';
import { SandwichService } from '../../services/sandwich.service';
import { SandwichModel } from '../../models/sandwich.model';

@Component({
    selector: 'app-custom-sandwich',
    templateUrl: './custom-sandwich.component.html',
    styleUrls: ['./custom-sandwich.component.css']
})
export class CustomSandwichComponent implements OnInit {

    toppings = {};
    toppingsArray = [];
    breads: Array<BreadModel>;

    constructor(private toppingService: ToppingService,
                private breadService: BreadService,
                private sandwichService: SandwichService) {
    }

    private logToppingName = '';

    private writeInBasket(element: HTMLInputElement): void {
        this.logToppingName += `${element.value} \n`;
    }

    private logBreadName = '';

    private addBreadInBasket(element: string): void {
        this.logBreadName = `${element} \n`;
    }


    ngOnInit() {

        this.toppingService.getToppings()
            .then(toppings => {
                //this.toppings = toppings;
                this.toppings = _.groupBy(toppings, t => t.type);
                this.toppingsArray = toppings;
                console.log('getToppings end', this.toppings);


            });
        this.breadService.getBreads()
            .then(breads => {
                console.log('getBreads end', breads);
                this.breads = breads;
            });

// this.availlableSize = SandwichModel.sizeValues;

    }

    get selectedOptions() {
        return this.toppingsArray
            .filter(opt => opt.checked);
    }

    getTotalToppings() {
        let total = 0;
        for (let i = 0; i < this.selectedOptions.length; i++) {
            if (this.selectedOptions[i].price) {
                total += this.selectedOptions[i].price;

            }
        }
        return total;

    }

    saveSandwich() {
        this.sandwichService.saveCustomSandwich(<SandwichModel>{
            'name': 'ItalienCustom',
            'description': 'Une délicieuse baguette ornée de jambon italien, de mozzarella et de crudités.',
            'toppings': [{
                'id': 6,
                'name': 'Tomates',
                'price': 0.05,
                'orderNumber': null,
                'type': 0
            },
                {
                    'id': 10,
                    'name': 'Jambon de Parme',
                    'price': 0.9,
                    'orderNumber': null,
                    'type': 0
                },
                {
                    'id': 11,
                    'name': 'Mozzarella',
                    'price': 0.75,
                    'orderNumber': null,
                    'type': 0
                },
                {
                    'id': 15,
                    'name': 'Crème balsamique',
                    'price': 0.05,
                    'orderNumber': null,
                    'type': 0
                }],
            'bread': {
                'id': 1,
                'name': 'Baguette de pain blanc',
                'description': 'Pain blanc légé et digeste.',
                'price': 2.5,
                'orderNumber': null
            }
        });
    }


}
