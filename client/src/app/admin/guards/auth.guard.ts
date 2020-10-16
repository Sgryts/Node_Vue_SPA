import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private auth: AuthService,
        private router: Router
    ) {
    }

    canActivate(): boolean {
        if (!!this.auth.getToken().length) {
            this.router.navigate(['/admin']);
            return false;
        }
        return true;
    }
}
