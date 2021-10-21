import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AuthService } from 'src/app/_shared/services/auth.service';

import { Post } from 'src/app/_shared/modals/post.modal';
import { PostService } from 'src/app/_shared/services/cruds/post.service';

@Component({
  selector: 'mrl-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  minhaContaForm: FormGroup;

  posts: Post[] = [];

  loading = false;

  constructor(
    private authService: AuthService,
    fb: FormBuilder,
    private postService: PostService
  ) {
    this.minhaContaForm = fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.minLength(6)]],
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.setFormDataBasedOnLoggedUser();
    this.getAllPostsFromLoggedUser();
  }

  getAllPostsFromLoggedUser() {
    let user = this.authService.getLoggedUser();
    this.loading = true;
    this.postService
      .find({}, this.authService.getAuthorization())
      .then((posts) => posts.filter((post) => post.user._id == user._id))
      .then((posts) => (this.posts = posts));
    this.loading = false;
  }

  setFormDataBasedOnLoggedUser() {
    let user = this.authService.getLoggedUser();
    delete user._id;
    this.minhaContaForm.patchValue(user);
  }

  getControl(name: string): FormControl {
    return this.minhaContaForm.get(name) as FormControl;
  }

  sendForm() {}

  getUsername() {
    return this.authService.getLoggedUser().name;
  }
}
