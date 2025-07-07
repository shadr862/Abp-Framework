import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { inject } from '@angular/core';

export const canActivateAdminGuard: CanActivateFn = (route, state) => {
  const service = inject(AuthService);
    return service.isAdmin && service.isLoggedIn;
};

