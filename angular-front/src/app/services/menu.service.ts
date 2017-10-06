import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Menu } from '../models/menu.model';

@Injectable()
export class MenuService {

    private baseUrl = 'http://localhost:8080/'
    private menuUrl = 'api/public/menu';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getMenu(): Promise<Menu> {
        return this.http.get(this.baseUrl + this.menuUrl)
            .toPromise()
            .then(response => response.json() as Menu)
            .catch(this.handleError);
    }

    // ---------------- PRIVATE ----------------
    private handleError(error: any): Promise<any> {
        console.error('An error occured', error); // for demo purpose only.
        return Promise.reject(error.message || error);
    }
}
