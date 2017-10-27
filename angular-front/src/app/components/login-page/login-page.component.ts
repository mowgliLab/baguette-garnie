import { Component, OnInit } from '@angular/core';
import { MemoryService } from '../../services/memory.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
    private returnUrl;

    constructor(private memoryService: MemoryService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    loggin(newValue: boolean) {
        this.memoryService.setIsLoggedIn(newValue);
        this.router.navigate([this.returnUrl]);
    }

}
