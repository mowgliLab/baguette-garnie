import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
    public user: UserModel; // our model
    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.user = <UserModel> {
            firstname: '',
            lastname: '',
            mail: '',
            password: ''
        };
    }

    save(model: UserModel, isValid: boolean) {
        // check if model is valid
        // if valid, call API to save customer
        console.log(model, isValid);
        this.userService.register(model).subscribe(res => {
            console.log(res);
        });
    }

}
