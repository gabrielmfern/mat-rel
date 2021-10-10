import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "src/app/_shared/services/auth.service";


@Component({
  selector: 'mrl-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  logout() {
    this.authService.signOut();
    this.router.navigate(['/security/login']);
  }

  getUsername() {
    return this.authService.getLoggedUser().name;
  }
}