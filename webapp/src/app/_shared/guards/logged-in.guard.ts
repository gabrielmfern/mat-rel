import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  async canActivate(): Promise<boolean> {
    const isLoggedIn = await this.auth.verifyIfLogged();
    if (!isLoggedIn) {
      this.router.navigate(['/security/login']);
      return false;
    }
    return true;
  }
}
