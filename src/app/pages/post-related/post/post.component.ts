import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/_shared/services/auth.service';
import { PostService } from 'src/app/_shared/services/cruds/post.service';

import { Post } from 'src/app/_shared/modals/post.modal';
import { User } from 'src/app/_shared/modals/user.modal';
import { MetaService } from 'src/app/_shared/services/meta.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'mrl-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() postId: string;

  post: Post;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private metaService: MetaService,
    private postService: PostService,
    @Inject(PLATFORM_ID) private platformId: Object,
    public authService: AuthService
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.params.id;

    if (!id && this.postId != '1') {
      this.router.navigate(['/']);
      return;
    }

    try {
      this.postId = id;
      await this.loadPost(id);
    } catch (exception) {
      console.error(exception);
      this.router.navigate(['/']);
    }
  }

  get loggedUser() {
    if (this.authService.isLoggedIn) return this.authService.getLoggedUser();

    return undefined;
  }

  isAuthor() {
    if (!this.loggedUser || !this.post || !isPlatformBrowser(this.platformId)) return false;

    return this.loggedUser._id == this.post.user._id;
  }

  hasAgreed() {
    if (!this.loggedUser || !this.post || !isPlatformBrowser(this.platformId)) return true;

    return typeof this.post.agreed.find((u) => u._id == this.loggedUser._id) != 'undefined';
  }

  hasDisagreed() {
    if (!this.loggedUser || !this.post || !isPlatformBrowser(this.platformId)) return true;

    return typeof this.post.disagreed.find((u) => u._id == this.loggedUser._id) != 'undefined';
  }

  async loadPost(id: string) {
    this.loading = true;
    this.post = await this.postService.findOne({
      _id: id
    });
    this.metaService.setTag('description', this.post.text);
    this.metaService.setTag('author', this.post.user.name);
    this.metaService.setTag('url', `https://mat-rel.com/post/${this.post._id}`);
    this.metaService.setTag(
      'keywords',
      'matrel, math discoveries, math, mathematics, discoveries, mat rel'
        .split(', ')
        .concat(this.post.tags.toLowerCase().split(',').join(', '))
        .join(', ')
        .concat(', ' + this.post.title + ', ' + this.post.title.split(' ').join(', '))
        .concat(', ' + this.post.user.name + ', ' + this.post.user.name.split(' ').join(', '))
    );
    this.metaService.setTitle(this.post.title);
    this.loading = false;
  }

  async agree() {
    if (!this.hasAgreed() && !this.isAuthor() && this.authService.isLoggedIn && !this.loading) {
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
    if (!this.hasDisagreed() && !this.isAuthor() && this.authService.isLoggedIn && !this.loading) {
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
