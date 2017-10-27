import { Component, OnInit } from '@angular/core';
import { OrderedSandwichModel, OrderModel } from '../../models/order.model';
import { MemoryService } from '../../services/memory.service';
import { SandwichUtil } from '../../utils/sandwich.util';

@Component({
    selector: 'app-order-confirm-page',
    templateUrl: './order-confirm-page.component.html',
    styleUrls: ['./order-confirm-page.component.css']
})
export class OrderConfirmPageComponent implements OnInit {

    currentOrder: OrderModel;

    constructor(private memoryService: MemoryService) {
    }

    ngOnInit() {
        // TODO remove after service is ok
        this.memoryService.currentOrder.subscribe(order => this.currentOrder = order);

        // Appel du service pour mettre à jour la commande d'après le serveur.
        // Cacher le menu de navigation.
    }

    onCancel() {
        // Appel du service pour mettre à jour la commande en tant que cancelled.
        // Retour à la page de menu.
        alert('Cancel Payment');
    }

    onValidatePayment(modal: any) {
        // Passage de la commande comme closed.
        modal.show();
    }

    computeRowPrice(sandwich: OrderedSandwichModel): number {
        return SandwichUtil.computeSandwichPriceFromFullPrice(sandwich, sandwich.sandwichSize);
    }

    getRowSizeName(sandwich: OrderedSandwichModel): string {
        return SandwichUtil.getSizeName(sandwich.sandwichSize);
    }
}
