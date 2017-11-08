import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { constants } from '../../environments/constants';

import 'rxjs/add/operator/toPromise';

import { MenuModel } from '../models/menu.model';

@Injectable()
export class MenuService {

    private baseUrl = environment.webServiceBaseUrl + constants.menuApi.publicUrl;
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getMenu(): Promise<MenuModel> {
        return this.http.get(this.baseUrl)
            .toPromise()
            .then(response => response.json() as MenuModel)
            .catch(this.handleError);
    }

    // ---------------- PRIVATE ----------------
    private handleError(error: any): Promise<any> {
        console.error('An error occured', error); // for demo purpose only.
        return Promise.reject(error.message || error);
    }
}
