import { Injectable } from '@angular/core';

import { CrudBaseService } from './crud.base.service';
import { ApiService } from '../api.service';

import { Commentary } from '../../modals/commentary.modal';

@Injectable()
export class CommentaryService extends CrudBaseService<Commentary> {
  constructor(api: ApiService) {
    super(api, 'commentary');
  }

  agree(filter: Partial<Commentary>, authorization?: string) {
    return this.api.get<{ currentAgreements: number }>(
      `/cruds/${this.endpoint}/agree${this.fromObjectToQuery(filter)}`,
      authorization
    );
  }

  disagree(filter: Partial<Commentary>, authorization?: string) {
    return this.api.get<{ currentDisagreements: number }>(
      `/cruds/${this.endpoint}/disagree${this.fromObjectToQuery(filter)}`,
      authorization
    );
  }
}
