import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { PostsDisplayComponent } from '../../_shared/components/posts-display/posts-display.component';

@Component({
  selector: 'mrl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('postsDisplay', { read: PostsDisplayComponent }) postsDisplay: PostsDisplayComponent;

  searchControl: FormControl = new FormControl('');
  lastSearchText = '';

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  handleSearch() {
    if (this.searchControl.value != this.lastSearchText) {
      this.postsDisplay.filter = {
        search: this.searchControl.value
      };
      this.postsDisplay.reload();
      this.lastSearchText = this.searchControl.value;
    }
  }
}
