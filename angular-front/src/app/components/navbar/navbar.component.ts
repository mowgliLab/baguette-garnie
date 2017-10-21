import { Component, OnInit } from '@angular/core';
import { MemoryService } from '../../services/memory.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    orderSandwichCount: number;
    isLoggedIn: boolean;

    constructor(private memoryService: MemoryService) {
    }

    ngOnInit() {
        this.memoryService.orderSandwichesCount.subscribe(count => this.orderSandwichCount = count);
        this.memoryService.isLoggedIn.subscribe(res => this.isLoggedIn = res);
    }

    loggin(newValue: boolean) {
        this.memoryService.setIsLoggedIn(newValue);
    }

}
