import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AuthService } from 'src/app/_shared/services/auth.service';
import { PostService } from 'src/app/_shared/services/cruds/post.service';

import { Post } from 'src/app/_shared/modals/post.modal';

@Component({
  selector: 'mrl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];

  searchControl: FormControl = new FormControl('');

  loading = false;

  constructor(private postService: PostService, private authService: AuthService) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.loading = true;
    await this.postService
      .find({}, this.authService.getAuthorization())
      .then((posts) => (this.posts = posts));
    this.loading = false;
  }

  handleSearch() {}
}
