import { Injectable } from "@angular/core";

import { CrudBaseService } from "./crud.base.service";
import { ApiService } from "../api.service";

import { Post } from "../../modals/post.modal";

@Injectable()
export class PostService extends CrudBaseService<Post> {
  constructor(api: ApiService) {
    super(api, 'post');
  }
}
