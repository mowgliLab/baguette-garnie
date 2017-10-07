import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SandwichModel } from '../../models/sandwich.model';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
    selector: 'app-sandwich-element',
    templateUrl: './sandwich-element.component.html',
    styleUrls: ['./sandwich-element.component.css']
})
export class SandwichElementComponent implements OnInit {

    @Input() sandwich: SandwichModel;
    @Output() showDetails: EventEmitter<SandwichModel> = new EventEmitter();
    @Output() addToOrder: EventEmitter<SandwichModel> = new EventEmitter();

    public modalRef: BsModalRef;

    constructor() { }

    ngOnInit() {
    }

    showDetailsClick(event: any, modalTemplate: any) {
        event.stopPropagation();
        this.showDetails.emit(this.sandwich);
        return false;
    }

    addToOrderClick(event: any, template) {
        event.stopPropagation();
        this.addToOrder.emit(this.sandwich);
        return false;
    }

}
