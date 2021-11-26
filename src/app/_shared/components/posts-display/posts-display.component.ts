import { Component, Input, OnInit } from "@angular/core";

import { PostService } from "src/app/_shared/services/cruds/post.service";
import { AuthService } from "src/app/_shared/services/auth.service";

import { Post } from "src/app/_shared/modals/post.modal";

@Component({
  selector: 'mrl-posts-display',
  templateUrl: './posts-display.component.html',
  styleUrls: ['./posts-display.component.scss']
})
export class PostsDisplayComponent implements OnInit {
  @Input() filter: Partial<Post> | any = {};
  @Input() occupyAllSpace = false;

  loading = false;

  page = 0;
  pageAmount = 0;
  posts: Post[] = [];

  constructor(public postService: PostService, private authService: AuthService) {}

  async ngOnInit() {
    this.loadPosts();
  }

  reload() {
    if (!this.loading) {
      this.posts = [];
      this.page = 0;
      this.loadPosts();
    }
  }

  loadPosts() {
    if (!this.loading) {
      this.loading = true;
      this.postService
        .find<{
          records: Post[];
          page: number;
          pageAmount: number;
        }>(
          {
            page: this.page,
            ...this.filter
          } as any
        , this.authService.getAuthorization())
        .then((result) => {
          this.posts.push(...result.records);
          this.pageAmount = result.pageAmount;
          this.loading = false;
        })
        .catch(err => {
          console.error(err);
          this.loading = false;
        });
    }
  }

  loadMore() {
    if (this.page < this.pageAmount - 1) {
      this.page++;
      this.loadPosts();
    }
  }
}
