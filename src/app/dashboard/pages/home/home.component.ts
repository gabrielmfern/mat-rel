import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AuthService } from 'src/app/_shared/services/auth.service';
import { PostService } from 'src/app/_shared/services/cruds/post.service';

import { Post } from 'src/app/_shared/modals/post.modal';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mrl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchControl: FormControl = new FormControl('');

  constructor() {}

  ngOnInit() { }

  handleSearch() {}
}
