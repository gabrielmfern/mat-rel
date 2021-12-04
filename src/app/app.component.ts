import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

declare let gtag: Function;

@Component({
  selector: 'mrl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    if (environment.production) {
      this.setUpAnalytics();
    }
  }

  setUpAnalytics() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        gtag('config', 'G-V7TEH9BV37', {
          page_path: event.urlAfterRedirects
        });
      });
  }
}
