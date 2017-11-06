import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderedSandwichModel, OrderModel } from '../../models/order.model';
import { MemoryService } from '../../services/memory.service';
import { SandwichUtil } from '../../utils/sandwich.util';
import { OrderService } from '../../services/order.service';
import { promise } from 'selenium-webdriver';
import { Router } from '@angular/router';

@Component({
    selector: 'app-order-confirm-page',
    templateUrl: './order-confirm-page.component.html',
    styleUrls: ['./order-confirm-page.component.css']
})
export class OrderConfirmPageComponent implements OnInit {

    readonly messageStatus = {
        paymentAccepted: 'payed',
        paymentRefused: 'paymentRefused',
        canceled: 'canceled',
        error: 'error'
    };
    updateStatus: string;
    @ViewChild('messageModal')messageModal;

    currentOrder: OrderModel;

    constructor(private memoryService: MemoryService,
                private orderService: OrderService,
                private router: Router) {
    }

    ngOnInit() {
        // TODO remove after service is ok
        this.memoryService.currentOrder.subscribe(order => this.currentOrder = order);

        // Appel du service pour mettre à jour la commande d'après le serveur.
        // Cacher le menu de navigation.
    }

    onCancel() {
        this.updateOrderStatus(OrderModel.statusValues.canceled)
            .then(res => {
                if (res) {
                    this.updateStatus = this.messageStatus.canceled;
                    this.memoryService.setOrder(new OrderModel());
                } else {
                    this.updateStatus = this.messageStatus.error;
                }
                this.messageModal.show();
            });
    }

    onValidatePayment() {
        // Passage de la commande comme closed.
        this.updateOrderStatus(OrderModel.statusValues.closed)
            .then(res => {
                if (res) {
                    this.updateStatus = this.messageStatus.paymentAccepted;
                    this.memoryService.setOrder(new OrderModel());
                } else {
                    this.updateStatus = this.messageStatus.paymentRefused;
                }
                this.messageModal.show();
            });
    }

    continueAfterAction() {
        this.router.navigate(['/menu']);
    }

    computeRowPrice(sandwich: OrderedSandwichModel): number {
        return SandwichUtil.computeSandwichPriceFromFullPrice(sandwich, sandwich.sandwichSize);
    }

    getRowSizeName(sandwich: OrderedSandwichModel): string {
        return SandwichUtil.getSizeName(sandwich.sandwichSize);
    }

    private updateOrderStatus(status: string): Promise<boolean> {
        return this.orderService.updateOrderStatus(this.currentOrder.id, status);
    }
}
