import { Component, OnInit } from '@angular/core';
import { ToppingService } from '../../services/topping.service';
import { BreadService } from '../../services/bread.service';
import { BreadModel } from '../../models/bread.model';
import { SandwichService } from '../../services/sandwich.service';
import { SandwichModel } from '../../models/sandwich.model';
import { MemoryService } from '../../services/memory.service';
import * as _ from 'lodash';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-custom-sandwich',
    templateUrl: './custom-sandwich.component.html',
    styleUrls: ['./custom-sandwich.component.css']
})
export class CustomSandwichComponent implements OnInit {

    toppings = {};
    toppingsArray = [];
    breads: Array<BreadModel>;

    currentCustomSandwich: SandwichModel;
    isLogedIn: boolean;

    constructor(private toppingService: ToppingService,
                private breadService: BreadService,
                private sandwichService: SandwichService,
                private memoryService: MemoryService,
                private router: Router,
                private alertService: AlertService) {
    }

    ngOnInit() {

        this.memoryService.currentCustomSandwich
            .subscribe(sandwich => {
                this.currentCustomSandwich = sandwich;
            });

        this.memoryService.isLoggedIn
            .subscribe(res => {
                this.isLogedIn = res;
            });

        this.toppingService.getToppings()
            .then(toppings => {
                // Pre check elements from sandwich in memory service.
                if (this.currentCustomSandwich.toppings) {
                    const checkedIds = _.map(this.currentCustomSandwich.toppings, t => t.id);
                    _.forEach(toppings, t => {
                        t.checked = checkedIds.indexOf(t.id) > 0;
                    });
                }

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


    private addBreadInBasket(element: BreadModel): void {
        this.currentCustomSandwich.bread = element;
    }

    selectedOptionsChanged() {
        this.currentCustomSandwich.toppings = this.toppingsArray
                .filter(opt => opt.checked);
    }

    // get selectedOptions() {
    //     const this.currentCustomSandwich.toppings = this.toppingsArray
    //         .filter(opt => opt.checked);
    //     // this.currentCustomSandwich.toppings = selectedOpt;
    //     return selectedOpt;
    // }

    get totalPrice() {
        let total = 0;

        if (this.currentCustomSandwich.bread) {
            total = this.currentCustomSandwich.bread.price;
        }

        if (this.currentCustomSandwich.toppings) {
            for (let i = 0; i < this.currentCustomSandwich.toppings.length; i++) {
                if (this.currentCustomSandwich.toppings[i].price) {
                    total += this.currentCustomSandwich.toppings[i].price;
                }
            }
        }

        return _.round(total, 2);
    }


    // ---------- OPEN MODAL / SAVE PART 1 ----------------

    showModalSave(modalTemplate: any) {
        console.log('save current sandwich', this.currentCustomSandwich);
        this.memoryService.setCustomSandwich(this.currentCustomSandwich);

        if (this.sandwichIsValid1()) {
            modalTemplate.show();
        }
    }

    private sandwichIsValid1() {

        if (!this.currentCustomSandwich.bread) {
            alert('Erreur : Veuillez choisir un pain');
            return false;
        }

        if (!this.currentCustomSandwich.toppings
            || this.currentCustomSandwich.toppings.length <= 0) {
            alert('Erreur : Veuillez choisir une garniture');
            return false;
        }

        return true;
    }


    // ---------- CLOSE MODAL / SAVE PART 2 ----------------

    saveSandwich(modalTemplate: any) {
        if (this.sandwichIsValid2(modalTemplate)) {
            if (!this.isLogedIn) {
                this.memoryService.setCustomSandwich(this.currentCustomSandwich);
                // If user is not loged in, redirect him to login page with param to get back to this page.
                this.router.navigate(['/login'], {queryParams: {returnUrl: '/custom'}});
            } else {
                this.sandwichService.saveCustomSandwich(this.currentCustomSandwich)
                    .then(res => {
                        if (res && res.id) {
                            this.memoryService.setCustomSandwich(new SandwichModel());
                            this.router.navigate(['/my-sandwiches']);
                            this.alertService.success('Sandwich créé avec succès.');
                        }
                    });
            }
        }
    }

    private sandwichIsValid2(modalTemplate: any): boolean {
        if (!this.sandwichIsValid1()) {
            alert('Fatal error : Veuillez compléter votre commande');
            modalTemplate.hide();
            return false;
        } else if (!this.currentCustomSandwich.name
            || this.currentCustomSandwich.name.trim() === '') {
            alert('Erreur : le nom du sandwich est obligatoire.');
            return false;
        }
        return true;
    }


}
