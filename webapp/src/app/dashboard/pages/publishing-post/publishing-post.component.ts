import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { PostService } from 'src/app/_shared/services/cruds/post.service';
import { AuthService } from 'src/app/_shared/services/auth.service';

import { Post } from 'src/app/_shared/modals/post.modal';

@Component({
  selector: 'mrl-publishing-post',
  templateUrl: './publishing-post.component.html',
  styleUrls: ['./publishing-post.component.scss'],
})
export class PublishingPostComponent implements OnInit {
  postForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private postService: PostService,
    private authService: AuthService
  ) {
    this.postForm = fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(100),
        ],
      ],
      text: [
        '',
        [
          Validators.required,
          Validators.minLength(100)
        ],
      ],
    });
  }

  ngOnInit() {}

  async submitForm() {
    if (this.postForm.valid) {
      const newPost: Partial<Post> = this.postForm.value;
      const _id = await this.postService.insertOne(newPost, this.authService.getAuthorization());
      this.router.navigate(['/']);
    }
  }

  getControl(name: string): FormControl {
    return this.postForm.get(name) as FormControl;
  }
}
