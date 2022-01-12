import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

import jwtDecode from 'jwt-decode';
import { first } from 'rxjs/operators';

import { ApiUsualResponse } from '../modals/api-error.modal';
import { User } from '../modals/user.modal';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private cacheedLoggedIn: boolean;
  private cacheedPromise: Promise<boolean>;

  constructor(
    private api: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) { }

  getLoggedUser(): User {
    return jwtDecode(localStorage.getItem('authentication'));
  }

  get isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;

    if (typeof this.cacheedLoggedIn === 'undefined' && !this.cacheedPromise) {
      this.cacheedPromise = this.verifyIfLogged().then((valid) => {
        this.cacheedLoggedIn = valid;
        if (this.cacheedLoggedIn) {
          const user = this.getLoggedUser();
          if (!user.verified && !this.router.url.includes('/security/verify-account')) {
            this.router.navigate(['/security/verify-account']);
          }
        }
        return valid;
      });
      return false;
    }

    return this.cacheedLoggedIn;
  }

  async verifyIfLogged(): Promise<boolean> {
    const result = await this.api.get<{ valid: boolean; updatedPayload?: string; }>(
      '/security/verify',
      localStorage.getItem('authentication')
    );
    if (result.valid) {
      localStorage.setItem('authentication', result.updatedPayload)
    }
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
  ): Promise<void | ApiUsualResponse> {
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
  ): Promise<{ code: number; userId: string; message: string } | ApiUsualResponse> {
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

  async verifyEmailByToken(token: string): Promise<ApiUsualResponse> {
    try {
      const result = await this.api.get<ApiUsualResponse>(`/security/verify-account?token=${token}`);

      return result;
    } catch (exception) {
      return exception;
    }
  }

  async resendEmailVerification(): Promise<ApiUsualResponse> {
    try {
      const result = await this.api.get<ApiUsualResponse>(
        `/security/send-email-verification`,
        this.getAuthorization()
      );

      return result;
    } catch (exception) {
      return exception;
    }
  }

  async signIn(email: string, password: string): Promise<string | ApiUsualResponse> {
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
