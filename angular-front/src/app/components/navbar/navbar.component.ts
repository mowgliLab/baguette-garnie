import { Component, OnInit } from '@angular/core';
import { MemoryService } from '../../services/memory.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    orderSandwichCount: number;
    isLoggedIn: boolean;

    constructor(private memoryService: MemoryService,
                private authService: AuthenticationService) {
    }

    ngOnInit() {
        this.memoryService.orderSandwichesCount.subscribe(count => this.orderSandwichCount = count);
        this.memoryService.isLoggedIn.subscribe(res => this.isLoggedIn = res);
    }

    logout() {
        this.authService.logout().subscribe(res => {
            console.log(res);
            this.memoryService.setIsLoggedIn(false);
        });
    }

}
