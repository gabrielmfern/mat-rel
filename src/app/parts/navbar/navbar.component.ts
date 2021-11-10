import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
  selector: 'mrl-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    this.isLoggedIn = await this.authService.verifyIfLogged();
  }

  logout() {
    this.authService.signOut();
    window.location.reload();
    this.router.navigate(['/security/login']);
  }

  getUsername() {
    if (!this.isLoggedIn) return '';
    return this.authService.getLoggedUser().name;
  }
}
