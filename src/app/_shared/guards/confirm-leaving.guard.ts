import { Injectable } from '@angular/core';
import { Router, CanDeactivate } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConfirmLeavingGuard implements CanDeactivate<any> {
  constructor(public auth: AuthService, public router: Router) {}

  async canDeactivate(): Promise<boolean> {
    return window.confirm('Are you sure you wish to close this page?');
  }
}
