import { environment } from 'src/environments/environment';
import { AfterViewInit, Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/_shared/services/auth.service';
import { NotificationService } from 'src/app/_shared/services/cruds/notification.service';

import { Notification } from 'src/app/_shared/modals/notification.modal';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'mrl-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {
  notifications: Notification[] = [];

  constructor(
    public authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngAfterViewInit() {
    this.notifications = await this.notificationService.getNotifications();
  }

  logout() {
    this.authService.signOut();
    window.location.reload();
    this.router.navigate(['/security/login']);
  }

  getUsername() {
    if (!this.authService.isLoggedIn) return '';
    return this.authService.getLoggedUser().name;
  }

  onNotificationsRead() {
    localStorage.setItem('notification_read', new Date().toString());
  }

  countUnreadNotifications() {
    if (!localStorage.getItem('notification_read')) return this.notifications.length;
    return this.notifications.filter(
      (notification) =>
        new Date(notification.date).getTime() > new Date(localStorage.getItem('notification_read')).getTime()
    ).length;
  }

  isInProduction() {
    return environment.production;
  }

  get isLoggedIn() {
    if (!isPlatformBrowser(this.platformId)) return false;

    return this.authService.isLoggedIn;
  }
}
