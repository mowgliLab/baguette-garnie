import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { MemoryService } from '../services/memory.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    private isLoggedIn: boolean;

    constructor(private router: Router,
                private memoryService: MemoryService) {
        this.memoryService.isLoggedIn.subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn );
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log(this.memoryService.isLoggedIn);

        if (this.isLoggedIn) {
            return true;
        }
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return false;
    }
}
