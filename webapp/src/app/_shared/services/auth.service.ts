import { Injectable } from '@angular/core';

import jwtDecode from 'jwt-decode';
import { first } from 'rxjs/operators';

import { ApiError } from '../modals/api-error.modal';
import { User } from '../modals/user.modal';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: ApiService) {}

  getLoggedUser(): User {
    return jwtDecode(localStorage.getItem('authentication'));
  }

  async verifyIfLogged(): Promise<boolean> {
    const a = await this.api
      .get<{ valid: boolean; }>(
        '/security/verify',
        localStorage.getItem('authentication')
      );
    return a.valid;
  }

  getAuthorization(): string {
    return localStorage.getItem('authentication');
  }

  async signUp(
    name: string,
    email: string,
    password: string
  ): Promise<void | ApiError> {
    try {
      await this.api.post<void>('/security/create-account', {
        name,
        email,
        password,
      });
    } catch (exception) {
      return exception;
    }
  }

  async signIn(email: string, password: string): Promise<string | ApiError> {
    try {
      const result = await this.api.post<{ authorization: string }>(
        '/security/sign',
        {
          email,
          password,
        }
      );

      localStorage.setItem('authentication', result.authorization);

      return result.authorization;
    } catch (exception) {
      return exception;
    }
  }
}
