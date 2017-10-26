import { Component, OnInit } from '@angular/core';
import { MemoryService } from '../../services/memory.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

    constructor(private memoryService: MemoryService) {
    }

    ngOnInit() {
    }

    loggin(newValue: boolean) {
        this.memoryService.setIsLoggedIn(newValue);
    }

}
