import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { AuthService } from 'src/app/_shared/services/auth.service';
import { MetaService } from 'src/app/_shared/services/meta.service';
import { PostsDisplayComponent } from '../../_shared/components/posts-display/posts-display.component';

@Component({
  selector: 'mrl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('postsDisplay', { read: PostsDisplayComponent }) postsDisplay: PostsDisplayComponent;

  searchForm: FormGroup;
  lastSearchText = '';

  constructor(
    public authService: AuthService,
    private metaService: MetaService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchText: ['', []]
    });

    this.metaService.setTag('description', 'The new land of discoveries');
    this.metaService.setTag('author', 'Gabriel Miranda');
    this.metaService.setTag('url', 'https://mat-rel.com/#/home');
    this.metaService.setTag('keywords', 'matrel, math discoveries, math, mathematics, discoveries, gabriel miranda, homepage, mat rel, latest publications, publications, hotest publications, latests math discoveries, latest mathematics discoveries');
    this.metaService.setTitle('Latest Publications');
  }

  getSearchControl(): FormControl {
    return this.searchForm.get('searchText') as FormControl;
  }

  handleSearch() {
    if (this.getSearchControl().value != this.lastSearchText) {
      this.postsDisplay.filter = {
        search: this.getSearchControl().value
      };
      this.postsDisplay.reload();
      this.lastSearchText = this.getSearchControl().value;
    }
  }
}
