import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
    public user: UserModel; // our model
    constructor(private userService: UserService,
                private alertService: AlertService,
                private router: Router) {
    }

    ngOnInit() {
        this.user = <UserModel>{};
    }

    save(model: UserModel, isValid: boolean) {
        // check if model is valid
        // if valid, call API to save customer
        this.userService.register(model).subscribe(
            res => {
                this.router.navigate(['/login']);
                this.alertService.success('Bienvenue ' + res.firstname);
            },
            err => {
                this.alertService.error('Problème d\'enregistrement. Veuillez vérifier les données ou contacter notre support technique.');
            });
    }

}
