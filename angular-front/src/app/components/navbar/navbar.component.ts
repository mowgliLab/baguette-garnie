import { Component, OnInit } from '@angular/core';
import { MemoryService } from '../../services/memory.service';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    orderSandwichCount: number;
    isLoggedIn: boolean;

    constructor(private memoryService: MemoryService,
                private authService: AuthenticationService,
                private alertService: AlertService,
                private router: Router) {
    }

    ngOnInit() {
        this.memoryService.orderSandwichesCount.subscribe(count => this.orderSandwichCount = count);
        this.memoryService.isLoggedIn.subscribe(res => this.isLoggedIn = res);
    }

    logout() {
        this.authService.logout().subscribe(res => {
            this.memoryService.setIsLoggedIn(false);
            this.router.navigate(['/menu']);
            this.alertService.success('A la prochaine fois');
        });
    }

}
