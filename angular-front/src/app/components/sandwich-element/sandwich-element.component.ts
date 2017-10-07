import { Component, Input, OnInit } from '@angular/core';
import { SandwichModel } from '../../models/sandwich.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { SandwichDetailsComponent } from '../sandwich-details/sandwich-details.component';

@Component({
    selector: 'app-sandwich-element',
    templateUrl: './sandwich-element.component.html',
    styleUrls: ['./sandwich-element.component.css']
})
export class SandwichElementComponent implements OnInit {

    @Input() sandwich: SandwichModel;

    public modalRef: BsModalRef;

    constructor(private modalService: BsModalService) {
    }

    ngOnInit() {
    }

    showDetails(event: any) {
        event.stopPropagation();

        let list = ['Open a modal with component', 'Pass your data', 'Do something else', '...'];
        this.modalRef = this.modalService.show(SandwichDetailsComponent);
        this.modalRef.content.title = 'Modal with component';
        this.modalRef.content.list = list;
        setTimeout(() => {
            list.push('PROFIT!!!');
        }, 2000);

        return false;
    }

    addToOrder(event: any, template) {
        event.stopPropagation();
        this.modalRef = this.modalService.show(template);
        return false;
    }

}
