import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'mrl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (environment.production) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // console.log(event.urlAfterRedirects);
          (window as any).ga('set', 'page', event.urlAfterRedirects);
          (window as any).ga('send', 'pageview');
        }
      });
    }
  }
}
