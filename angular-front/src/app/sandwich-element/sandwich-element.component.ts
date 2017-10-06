import { Component, Input, OnInit } from '@angular/core';
import { Sandwich } from '../models/sandwich.model';

@Component({
    selector: 'app-sandwich-element',
    templateUrl: './sandwich-element.component.html',
    styleUrls: ['./sandwich-element.component.css']
})
export class SandwichElementComponent implements OnInit {

    @Input() sandwich: Sandwich;

    constructor() {
    }

    ngOnInit() {
    }

}
