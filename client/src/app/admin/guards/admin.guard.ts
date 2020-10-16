import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AdminGuard implements CanActivate, CanLoad {
    constructor(
        private auth: AuthService,
        private router: Router
    ) {
    }

    canLoad(): boolean {
        return this.canActivate();
    }

    canActivate(): boolean {
        if (!this.auth.getToken().length) {
            this.router.navigate(['/admin/login']);
            return false;
        }
        return true;
    }
}
