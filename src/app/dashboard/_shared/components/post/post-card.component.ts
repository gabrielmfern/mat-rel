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

  constructor(private router: Router, private authService: AuthService, private postService: PostService) {}

  ngOnInit() {
    this.loggedUser = this.authService.getLoggedUser();
  }

  editPost() {
    this.router.navigate([`/dashboard/publishing-post/${this.post._id}`]);
  }

  async deletePost(): Promise<void> {
    if (confirm('Você tem certeza que deseja deletar esta publicação?')) {
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
    return this.post.user._id == this.loggedUser._id;
  }
}
