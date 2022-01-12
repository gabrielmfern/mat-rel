import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
  selector: 'mrl-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit, AfterViewInit {
  token: string;
  loading = false;

  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router) {}

  async ngOnInit() {}

  async ngAfterViewInit() {
    console.log(this.auth.getLoggedUser());
    if (this.auth.getLoggedUser().verified) {
      this.router.navigate(['/']);
    } else {
      this.token = this.route.snapshot.queryParams.token;
      if (this.token) {
        this.loading = true;
        try {
          await this.auth.verifyEmailByToken(this.token);
        } catch (exception) {
          this.router.navigate(['/']);
        }
        this.loading = false;
      }
    }
  }

  async resendEmail() {
    this.loading = true;
    await this.auth.resendEmailVerification();
    this.loading = false;
  }
}
