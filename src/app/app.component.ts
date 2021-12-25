import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'mrl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    if (environment.production) {
      this.setUpAnalytics();
    }

    this.document.defaultView['dataLayer'] = this.document.defaultView['dataLayer'] || [];
    this.document.defaultView['gtag'] = function () {
      this.dataLayer.push(arguments);
    };
    this.document.defaultView['gtag']('js', new Date());
  }

  setUpAnalytics() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.document.defaultView['gtag']('config', 'G-V7TEH9BV37', {
          page_path: event.urlAfterRedirects
        });
      });
  }
}
