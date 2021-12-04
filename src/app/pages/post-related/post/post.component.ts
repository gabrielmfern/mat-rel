import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/_shared/services/auth.service';
import { PostService } from 'src/app/_shared/services/cruds/post.service';

import { Post } from 'src/app/_shared/modals/post.modal';
import { User } from 'src/app/_shared/modals/user.modal';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'mrl-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() postId: string;

  post: Post;
  loading = false;

  loggedUser: Partial<User>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private meta: Meta,
    private postService: PostService,
    public authService: AuthService
  ) {}

  async ngOnInit() {
    if (this.authService.isLoggedIn) this.loggedUser = this.authService.getLoggedUser();

    this.route.params.subscribe(async (params) => {
      if (!params.id && this.postId != '1') {
        this.router.navigate(['/']);
        return;
      }

      this.loading = true;
      try {
        this.postId = params.id;
        await this.loadPost(params.id);
      } catch (exception) {
        console.error(exception);
        this.router.navigate(['/']);
      }
      this.loading = false;
    });
  }

  isAuthor() {
    if (!this.loggedUser || !this.post) return false;

    return this.loggedUser._id == this.post.user._id;
  }

  hasAgreed() {
    if (!this.loggedUser || !this.post) return true;

    return typeof this.post.agreed.find((u) => u._id == this.loggedUser._id) != 'undefined';
  }

  hasDisagreed() {
    if (!this.loggedUser || !this.post) return true;

    return typeof this.post.disagreed.find((u) => u._id == this.loggedUser._id) != 'undefined';
  }

  async loadPost(id: string) {
    this.loading = true;
    this.post = await this.postService.findOne({
      _id: id
    });
    this.title.setTitle(`MatRel - ${this.post.title}`);
    this.meta.addTags([
      { name: 'description', content: this.post.text },
      { name: 'author', content: this.post.user.name },
      { name: 'keywords', content: this.post.tags.toLowerCase() }
    ]);
    this.loading = false;
  }

  async agree() {
    if (!this.hasAgreed && !this.isAuthor && this.authService.isLoggedIn && !this.loading) {
      const disagreedIndex = this.post.disagreed.map((u) => u._id).indexOf(this.loggedUser._id);
      if (disagreedIndex > -1) {
        this.post.disagreed.splice(disagreedIndex);
      }
      this.post.agreed.push(this.loggedUser);
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
    if (!this.hasDisagreed && !this.isAuthor && this.authService.isLoggedIn && !this.loading) {
      const agreedIndex = this.post.agreed.map((u) => u._id).indexOf(this.loggedUser._id);
      if (agreedIndex > -1) {
        this.post.agreed.splice(agreedIndex);
      }
      this.post.disagreed.push(this.loggedUser);
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
