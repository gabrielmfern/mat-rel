import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_shared/modals/user.modal';
import { PostService } from 'src/app/_shared/services/cruds/post.service';
import { UserService } from 'src/app/_shared/services/cruds/user.service';
import { MetaService } from 'src/app/_shared/services/meta.service';

@Component({
  selector: 'mrl-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  loading = false;
  user: Partial<User> = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private metaService: MetaService
  ) { }

  async ngOnInit() {
    const params = this.route.snapshot.params;

    if (params.id) {
      this.user._id = params.id;
      this.loading = true;
      try {
        const user = await this.userService
          .findOne({
            _id: params.id
          })
        this.user = user;
        this.loading = false;
        this.metaService.setTag('description', this.user.bio);
        this.metaService.setTag('author', 'Gabriel Miranda');
        this.metaService.setTag(
          'keywords',
          'matrel, mat rel, ' + this.user.name + ', ' + this.user.name.split(' ').join(', ')
        );
        this.metaService.setTag('url', `https://mat-rel.com/user/${this.user._id}`);
        this.metaService.setTitle(this.user.name);
      } catch (err) {
        this.loading = false;
        // await this.ngOnInit();
        // window.location.reload();
        return;
      };
    } else {
      this.router.navigate(['/']);
    }
  }
}
