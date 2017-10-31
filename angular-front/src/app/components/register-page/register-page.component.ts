import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
    public user: UserModel; // our model
    constructor() {
    }

    ngOnInit() {
        this.user = {
            firstname:'',
            name: '',
            mail:'',
            password:''
           
            
        };
    }
    save(model: UserModel, isValid: boolean) {
        // check if model is valid
        // if valid, call API to save customer
        console.log(model, isValid);
    }
    
}
