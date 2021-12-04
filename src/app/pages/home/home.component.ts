import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';

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

  searchForm: FormGroup;
  lastSearchText = '';

  constructor(
    public authService: AuthService,
    private meta: Meta,
    private title: Title,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchText: ['', []]
    });

    this.meta.addTags([
      { name: 'description', content: 'The new lands of discoveries' },
      { name: 'author', content: 'Gabriel Miranda' },
      {
        name: 'keywords',
        content:
          'matrel, math discoveries, math, mathematics, discoveries, gabriel miranda, hotest publications, publications'
      }
    ]);
    this.title.setTitle('MatRel - Hotest Publications');
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
