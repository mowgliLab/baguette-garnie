import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { MenuModel } from '../models/menu.model';

@Injectable()
export class MenuService {

    private baseUrl = 'http://localhost:8080/'
    private menuUrl = 'api/public/menu';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getMenu(): Promise<MenuModel> {
        return this.http.get(this.baseUrl + this.menuUrl)
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
