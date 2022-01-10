import { Injectable } from '@angular/core';
import { Notification } from '../../modals/notification.modal';

import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

@Injectable()
export class NotificationService {
  constructor(private api: ApiService, private authService: AuthService) {}

  getNotifications() {
    return this.api.get<Notification[]>('/notification', this.authService.getAuthorization());
  }
}
