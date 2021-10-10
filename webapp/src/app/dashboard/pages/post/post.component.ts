import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { Post } from 'src/app/_shared/modals/post.modal';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { PostService } from 'src/app/_shared/services/cruds/post.service';

@Component({
  selector: 'mrl-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post: Post;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      if (!params.id) {
        this.router.navigate(['/']);
      } else {
        try {
          this.loading = true;
          this.post = await this.postService.findOne(
            {
              _id: params.id,
            },
            this.authService.getAuthorization()
          );
          this.loading = false;
        } catch (exception) {
          console.error(exception);
          this.loading = false;
          this.router.navigate(['/']);
        }
      }
    });
  }
}
