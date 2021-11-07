import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AuthService } from 'src/app/_shared/services/auth.service';
import { PostService } from 'src/app/_shared/services/cruds/post.service';

import { Post } from 'src/app/_shared/modals/post.modal';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mrl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];

  searchControl: FormControl = new FormControl('');

  loading = false;

  page = 0;
  pageAmount = 1;

  constructor(private postService: PostService, private authService: AuthService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    if (!this.loading) {
      this.loading = true;
      this.postService
        .find<{
          records: Post[];
          page: number;
          pageAmount: number;
        }>(
          {
            page: this.page
          } as any,
          this.authService.getAuthorization()
        )
        .then((result) => {
          this.posts = result.records;
          this.pageAmount = result.pageAmount;
          this.loading = false;
        })
        .catch(err => {
          console.error(err);
          this.loading = false;
        });
    }
  }

  handleSearch() {}

  nextPage() {
    if (this.page < this.pageAmount - 1) {
      this.page++;
      this.loadData();
    }
  }

  lastPage() {
    if (this.page > 0) {
      this.page--;
      this.loadData();
    }
  }
}
