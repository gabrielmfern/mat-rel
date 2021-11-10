import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ControlInputComponent } from 'src/app/_shared/mrl-forms/control-input/control-input.component';

import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
  selector: 'mrl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  @ViewChild('emailControl', { read: ControlInputComponent })
  emailControl: ControlInputComponent;

  @ViewChild('passwordControl', { read: ControlInputComponent })
  passwordControl: ControlInputComponent;

  loading = false;

  constructor(fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  async sendForm() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    try {
      this.loading = true;
      await this.auth.signIn(email, password);
      window.location.reload();
      this.router.navigate(['/']);
      this.loading = false;
    } catch (exception) {
      this.loading = false;
      if (exception.error.message == 'Could not find any user with that email!') {
        this.loginForm.get('email').setErrors({
          ...this.loginForm.get('email').errors,
          'user-not-found': true
        });
        this.emailControl.setErrorMessageAndValidState();
      } else if (exception.error.message == 'The password is incorrect!') {
        this.loginForm.get('password').setErrors({
          ...this.loginForm.get('password').errors,
          'wrong-password': true
        });
        this.passwordControl.setErrorMessageAndValidState();
      }
    }
  }

  getControl(formControlName: string): FormControl {
    return this.loginForm.controls[formControlName] as FormControl;
  }
}
