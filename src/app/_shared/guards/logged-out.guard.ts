import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.auth.verifyIfLogged();
    if (isLoggedIn) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
