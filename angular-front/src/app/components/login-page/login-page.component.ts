import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MemoryService } from '../../services/memory.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
    private returnUrl;

    loginForm: FormGroup;

    constructor(private memoryService: MemoryService,
                private authService: AuthenticationService,
                private route: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,
                private alertService: AlertService) {
        this.loginForm = formBuilder.group({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        });
    }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/menu';
    }

    login(value: any) {
        this.authService.login(value.username, value.password)
            .subscribe(
                data => {
                    this.memoryService.setIsLoggedIn(true);
                    this.router.navigate([this.returnUrl]);
                    this.alertService.success('Login SUCCESS');
                },
                error => {
                    this.memoryService.setIsLoggedIn(false);
                    this.alertService.error('Email ou mot de passe incorrect');
                });
    }

}
