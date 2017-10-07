import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
    selector: 'app-sandwich-details',
    templateUrl: './sandwich-details.component.html',
    styleUrls: ['./sandwich-details.component.css']
})
export class SandwichDetailsComponent implements OnInit {

    public title: string;
    public list: any[] = [];

    constructor(public bsModalRef?: BsModalRef) {
    }

    ngOnInit() {
    }

}
