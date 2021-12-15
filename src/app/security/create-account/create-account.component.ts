import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ControlInputComponent } from 'src/app/_shared/mrl-forms/control-input/control-input.component';

import { AuthService } from 'src/app/_shared/services/auth.service';
import { MetaService } from 'src/app/_shared/services/meta.service';

@Component({
  selector: 'mrl-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  createAccountForm: FormGroup;

  @ViewChild('emailControl', { read: ControlInputComponent })
  emailControl: ControlInputComponent;

  loading = false;

  constructor(
    fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private metaService: MetaService
  ) {
    this.createAccountForm = fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [true, [Validators.requiredTrue]]
    });
  }

  ngOnInit() {
    this.metaService.setTag('description', 'The new land of discoveries');
    this.metaService.setTag('author', 'Gabriel Miranda');
    this.metaService.setTag('url', 'https://mat-rel.com/#/security/create-account');
    this.metaService.setTag('keywords', 'matrel, math discoveries, math, mathematics, discoveries, gabriel miranda, mat rel, signup, sign up, register, create account, new account');
    this.metaService.setTitle('Create Account');
  }

  async sendForm() {
    const { name, email, password } = this.createAccountForm.value;
    try {
      this.loading = true;
      await this.auth.signUp(name, email, password);
      this.loading = false;
      this.router.navigate(['/security/login']);
    } catch (exception) {
      this.loading = false;
      if (exception.error.message == 'There already exists a user with that email!') {
        this.createAccountForm.get('email').setErrors({
          ...this.createAccountForm.get('email').errors,
          'user-already-exists': true
        });
        this.emailControl.setErrorMessageAndValidState();
      }
    }
  }

  getControl(formControlName: string): FormControl {
    return this.createAccountForm.controls[formControlName] as FormControl;
  }
}
