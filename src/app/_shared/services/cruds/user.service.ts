import { Injectable } from "@angular/core";

import { ApiService } from "../api.service";

import { User } from "../../modals/user.modal";

@Injectable()
export class UserService {
  constructor(private api: ApiService) {}

  protected fromObjectToQuery(filterObject: { [key: string]: any }): string {
    const keys = Object.keys(filterObject);
    let result = '';

    keys.forEach((key, i) => {
      const char = i == 0 ? '?' : '&';
      result += `${char}${key}=${filterObject[key]}`;
    });

    return result;
  }

  findOne(filter: Partial<User> = {}, authorization?: string): Promise<Partial<User>> {
    return this.api.get<Partial<User>>(
      `/user/one${this.fromObjectToQuery(filter)}`,
      authorization
    );
  }

  find(filter: Partial<User> = {}, authorization?: string): Promise<{
    records: User[],
    page: number,
    pageAmount: number
  }> {
    return this.api.get<{
      records: User[],
      page: number,
      pageAmount: number
    }>(`/user${this.fromObjectToQuery(filter)}`, authorization);
  }
}
