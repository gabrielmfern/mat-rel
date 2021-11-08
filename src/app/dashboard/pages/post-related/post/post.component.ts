import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { Post } from 'src/app/_shared/modals/post.modal';
import { User } from 'src/app/_shared/modals/user.modal';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { PostService } from 'src/app/_shared/services/cruds/post.service';

@Component({
  selector: 'mrl-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() postId: string;

  post: Post;
  loading = false;
  isAuthor: boolean = true;

  loggedUser: Partial<User>;

  hasAgreed: boolean = false;
  hasDisagreed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loggedUser = this.authService.getLoggedUser();

    this.route.params.subscribe(async (params) => {
      if (!params.id && this.postId != '1') {
        this.router.navigate(['/']);
        return;
      }

      this.loading = true;
      try {
        this.postId = params.id;
        await this.loadPost(params.id);
        this.isAuthor = this.loggedUser._id == this.post.user._id;
        this.hasAgreed = this.post.agreed.map((u) => u._id).includes(this.loggedUser._id);
        this.hasDisagreed = this.post.disagreed.map((u) => u._id).includes(this.loggedUser._id);
      } catch (exception) {
        console.error(exception);
        this.router.navigate(['/']);
      }
      this.loading = false;
    });
  }

  async loadPost(id: string) {
    this.loading = true;
    this.post = await this.postService.findOne(
      {
        _id: id
      },
      this.authService.getAuthorization()
    );
    this.loading = false;
  }

  async agree() {
    if (!this.hasAgreed && !this.loading) {
      const disagreedIndex = this.post.disagreed.map((u) => u._id).indexOf(this.loggedUser._id);
      if (disagreedIndex > -1) {
        this.post.disagreed.splice(disagreedIndex);
      }
      this.post.agreed.push(this.loggedUser);
      this.hasAgreed = true;
      this.hasDisagreed = false;
      await this.postService.agree(
        {
          _id: this.post._id
        },
        this.authService.getAuthorization()
      );
      // await this.loadPost(this.post._id);
    }
  }

  async disagree() {
    if (!this.hasDisagreed) {
      const agreedIndex = this.post.agreed.map((u) => u._id).indexOf(this.loggedUser._id);
      if (agreedIndex > -1) {
        this.post.agreed.splice(agreedIndex);
      }
      this.post.disagreed.push(this.loggedUser);
      this.hasAgreed = false;
      this.hasDisagreed = true;
      await this.postService.disagree(
        {
          _id: this.post._id
        },
        this.authService.getAuthorization()
      );
      // await this.loadPost(this.post._id);
    }
  }
}
