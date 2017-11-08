import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { MemoryService } from '../services/memory.service';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    private isLoggedIn: boolean;

    constructor(private router: Router,
                private memoryService: MemoryService,
                private authenticationService: AuthenticationService) {
        this.memoryService.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn );
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        console.log(this.memoryService.isLoggedIn);

        return this.authenticationService.checkSessionValidity().map(result => {
            if (result) {
                // logged in so return true
                this.memoryService.setIsLoggedIn(true);
                return true;
            }

            // not logged in so redirect to login page with the return url
            this.memoryService.setIsLoggedIn(false);
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        });
    }
}
