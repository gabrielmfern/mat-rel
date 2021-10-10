import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "src/app/_shared/services/auth.service";

@Component({
  selector: 'mrl-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  createAccountForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.createAccountForm = fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  async sendForm() {
    const { name, email, password } = this.createAccountForm.value;
    try {
      await this.auth.signUp(name, email, password);
      this.router.navigate(['/security/login']);
    } catch (exception) {
      if (
        exception.message == 'Já existe um usuário com este email!'
      ) {
        this.createAccountForm.get('email').setErrors({
          ...this.createAccountForm.get('email').errors,
          'email-in-use': true,
        });
      }
    }
  }

  getControl(formControlName: string): FormControl {
    return this.createAccountForm.controls[formControlName] as FormControl;
  }
}
