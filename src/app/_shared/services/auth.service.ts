import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import jwtDecode from 'jwt-decode';
import { first } from 'rxjs/operators';

import { ApiError } from '../modals/api-error.modal';
import { User } from '../modals/user.modal';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private cacheedLoggedIn: boolean;

  constructor(private api: ApiService, @Inject(PLATFORM_ID) private platformId: Object) {
    // this.verifyIfLogged().then((result) => {
    //   this.isLoggedIn = result;
    // });
  }

  getLoggedUser(): User {
    return jwtDecode(localStorage.getItem('authentication'));
  }

  get isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;

    if (typeof this.cacheedLoggedIn === 'undefined') {
      this.verifyIfLogged().then(valid => this.cacheedLoggedIn = valid);
      return false;
    }

    return this.cacheedLoggedIn
  }

  async verifyIfLogged(): Promise<boolean> {
    const result = await this.api.get<{ valid: boolean; }>(
      '/security/verify',
      localStorage.getItem('authentication')
    );
    return result.valid;
  }

  getAuthorization(): string {
    return localStorage.getItem('authentication');
  }

  signOut(): void {
    localStorage.removeItem('authentication');
  }

  async updateAccount(
    name: string,
    email: string,
    bio: string,
    currentPassword: string,
    newPassword?: string
  ): Promise<void | ApiError> {
    try {
      await this.api.post<void>(
        '/security/update-account',
        {
          name,
          email,
          bio,
          currentPassword,
          newPassword
        },
        this.getAuthorization()
      );
    } catch (exception) {
      throw exception;
    }
  }

  async signUp(
    name: string,
    email: string,
    password: string
  ): Promise<{ code: number; userId: string; message: string } | ApiError> {
    try {
      return await this.api.post<{ code: number; userId: string; message: string }>(
        '/security/create-account',
        {
          name,
          email,
          password
        }
      );
    } catch (exception) {
      throw exception;
    }
  }

  async signIn(email: string, password: string): Promise<string | ApiError> {
    try {
      const result = await this.api.post<{ authorization: string }>('/security/sign', {
        email,
        password
      });

      localStorage.setItem('authentication', result.authorization);

      return result.authorization;
    } catch (exception) {
      throw exception;
    }
  }
}
