import { Injectable } from '@angular/core';

import { CrudBaseService } from './crud.base.service';
import { ApiService } from '../api.service';

import { Post } from '../../modals/post.modal';

@Injectable()
export class PostService extends CrudBaseService<Post> {
  constructor(api: ApiService) {
    super(api, 'post');
  }

  agree(filter: Partial<Post>, authorization?: string) {
    return this.api.get<{ currentAgreements: number }>(
      `/cruds/${this.endpoint}/agree${this.fromObjectToQuery(filter)}`,
      authorization
    );
  }

  disagree(filter: Partial<Post>, authorization?: string) {
    return this.api.get<{ currentDisagreements: number }>(
      `/cruds/${this.endpoint}/disagree${this.fromObjectToQuery(filter)}`,
      authorization
    );
  }
}
