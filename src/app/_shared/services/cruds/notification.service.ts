import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Notification } from '../../modals/notification.modal';

import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Injectable()
export class NotificationService {
  constructor(private api: ApiService, private authService: AuthService) {}

  async getNotifications() {
    if (!this.authService.isLoggedIn) return [];
    if (!this.authService.getLoggedUser().verified) return [];
    return this.api.get<Notification[]>('/notification', this.authService.getAuthorization());
  }
}
