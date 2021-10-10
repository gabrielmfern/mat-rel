import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
  selector: 'mrl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, [Validators.requiredTrue]]
    });
  }

  ngOnInit() {}

  async sendForm() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    try {
      await this.auth.signIn(email, password);
      this.router.navigate(['/']);
    } catch (exception) {
      if (
        exception.message == 'Não foi encontrado nenhum usuário com este email!'
      ) {
        this.loginForm.get('email').setErrors({
          ...this.loginForm.get('email').errors,
          'user-not-found': true,
        });
      } else if (exception.message == 'A senha está incorreta!') {
        this.loginForm.get('password').setErrors({
          ...this.loginForm.get('password').errors,
          'wrong-password': true,
        });
      }
    }
  }

  getControl(formControlName: string): FormControl {
    return this.loginForm.controls[formControlName] as FormControl;
  }
}
