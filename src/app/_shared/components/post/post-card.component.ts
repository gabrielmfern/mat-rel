import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AuthService } from 'src/app/_shared/services/auth.service';

import { Post } from 'src/app/_shared/modals/post.modal';
import { User } from 'src/app/_shared/modals/user.modal';
import { PostService } from 'src/app/_shared/services/cruds/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mrl-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
  @Input() post: Post;

  @Output() deleteUser = new EventEmitter<void>();

  loggedUser: User;
  loading = false;

  constructor(private router: Router, public authService: AuthService, private postService: PostService) {}

  async ngOnInit() {
    if (this.authService.isLoggedIn)
      this.loggedUser = this.authService.getLoggedUser();
  }

  editPost() {
    this.router.navigate([`/publishing-post/${this.post._id}`]);
  }

  async deletePost(): Promise<void> {
    if (confirm('Are you sure you want to delete your publication?')) {
      this.loading = true;
      await this.postService.deleteOne(
        {
          _id: this.post._id
        },
        this.authService.getAuthorization()
      );
      this.loading = false;

      this.deleteUser.emit();
    }
  }

  isLoggedUserAuthor(): boolean {
    if (!this.authService.isLoggedIn) return false;
    return this.post.user._id == this.loggedUser._id;
  }
}
