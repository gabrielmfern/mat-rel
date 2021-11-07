import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/_shared/services/auth.service';

import { ControlInputComponent } from 'src/app/_shared/mrl-forms/control-input/control-input.component';

import { Post } from 'src/app/_shared/modals/post.modal';
import { User } from 'src/app/_shared/modals/user.modal';

@Component({
  selector: 'mrl-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  minhaContaForm: FormGroup;

  posts: Post[] = [];

  loading = false;

  @ViewChild('nameControl', { read: ControlInputComponent })
  nameControl: ControlInputComponent;

  @ViewChild('emailControl', { read: ControlInputComponent })
  emailControl: ControlInputComponent;

  @ViewChild('passwordControl', { read: ControlInputComponent })
  passwordControl: ControlInputComponent;

  @ViewChild('newPasswordControl', { read: ControlInputComponent })
  newPasswordControl: ControlInputComponent;

  loggedUser: User;

  constructor(public authService: AuthService, fb: FormBuilder) {
    this.minhaContaForm = fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.minLength(6)]],
      currentPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.setFormDataBasedOnLoggedUser();
  }

  setFormDataBasedOnLoggedUser() {
    this.loggedUser = this.authService.getLoggedUser();
    delete this.loggedUser._id;
    this.minhaContaForm.patchValue(this.loggedUser);
  }

  getControl(name: string): FormControl {
    return this.minhaContaForm.get(name) as FormControl;
  }

  async sendForm() {
    const formValue: {
      name: string;
      email: string;
      currentPassword: string;
      newPassword?: string;
    } = this.minhaContaForm.value;
    this.loading = true;
    try {
      await this.authService.updateAccount(
        formValue.name,
        formValue.email,
        formValue.currentPassword,
        formValue.newPassword
      );
      await this.authService.signIn(
        formValue.email,
        formValue.newPassword == '' || !formValue.newPassword
          ? formValue.currentPassword
          : formValue.newPassword
      );
    } catch (exception) {
      if (exception.error.message == 'The password is incorrect!') {
        this.minhaContaForm.get('currentPassword').setErrors({
          ...this.minhaContaForm.get('currentPassword').errors,
          'wrong-password': true
        });
        this.passwordControl.setErrorMessageAndValidState();
      } else if (exception.error.message == 'There already exists a user with that email!') {
        this.minhaContaForm.get('email').setErrors({
          ...this.minhaContaForm.get('email').errors,
          'user-already-exists': true
        });
        this.emailControl.setErrorMessageAndValidState();
      } else {
        this.passwordControl.setErrorMessageAndValidState();
        this.emailControl.setErrorMessageAndValidState();
        this.nameControl.setErrorMessageAndValidState();
        this.passwordControl.setErrorMessageAndValidState();
      }
    }
    this.loading = false;
  }

  getUsername() {
    return this.authService.getLoggedUser().name;
  }
}
