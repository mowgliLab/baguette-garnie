import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { SandwichModel } from '../models/sandwich.model';
import { SANDWICH } from '../mocks/sandwich.mock';

@Injectable()
export class SandwichService {

    private baseUrl = 'http://localhost:8080'
    private sandwichUrl = 'api/public/sandwich';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {
    }

    getSandwich(id: number): Promise<SandwichModel> {
        return this.http.get(`${this.baseUrl}/${this.sandwichUrl}/${id}`)
            .toPromise()
            .then(response => response.json() as SandwichModel)
            .catch(this.handleError);
        // return Promise.resolve(SANDWICH);
    }

    // ---------------- PRIVATE ----------------
    private handleError(error: any): Promise<any> {
        console.error('An error occured', error); // for demo purpose only.
        return Promise.reject(error.message || error);
    }
}
