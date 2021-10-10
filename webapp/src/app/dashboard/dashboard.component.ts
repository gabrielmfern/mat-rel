import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { PostService } from '../_shared/services/cruds/post.service';
import { AuthService } from '../_shared/services/auth.service';

import { Post } from '../_shared/modals/post.modal';

@Component({
  selector: 'mrl-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  posts: Post[] = [];

  searchControl: FormControl = new FormControl('');

  loading = false;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

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

  handleSearch() {

  }
}
