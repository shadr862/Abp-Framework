import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { inject } from '@angular/core';

export const canActivateGuard: CanActivateFn = (route, state) => {
    const service = inject(AuthService);
    return service.isLoggedIn;
};
