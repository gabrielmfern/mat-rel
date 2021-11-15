import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
  selector: 'mrl-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  async ngOnInit() { }

  logout() {
    this.authService.signOut();
    window.location.reload();
    this.router.navigate(['/security/login']);
  }

  getUsername() {
    if (!this.authService.isLoggedIn) return '';
    return this.authService.getLoggedUser().name;
  }

  isInProduction() {
    return environment.production;
  }
}
