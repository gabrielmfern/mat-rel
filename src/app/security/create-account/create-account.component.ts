import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ControlInputComponent } from 'src/app/_shared/mrl-forms/control-input/control-input.component';

import { AuthService } from 'src/app/_shared/services/auth.service';

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
    private meta: Meta,
    private title: Title
  ) {
    this.createAccountForm = fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, [Validators.requiredTrue]]
    });
  }

  ngOnInit() {
    this.meta.addTags([
      { name: 'description', content: 'The new land of discoveries' },
      { name: 'author', content: 'Gabriel Miranda' },
      {
        name: 'keywords',
        content:
          'matrel, math discoveries, math, mathematics, discoveries, gabriel miranda, sign up, create account, signup, register'
      }
    ]);
    this.title.setTitle('MatRel - Create Account');
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
