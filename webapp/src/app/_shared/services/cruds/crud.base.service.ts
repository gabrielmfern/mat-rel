import { ApiService } from '../api.service';

export abstract class CrudBaseService<T> {
  constructor(
    protected api: ApiService,
    protected endpoint: string
  ) {}

  protected fromObjectToQuery(filterObject: { [key: string]: any }): string {
    const keys = Object.keys(filterObject);
    let result = '';

    if (keys.length > 0) {
      result += `?${keys[0]}=${filterObject[keys[0]].toString()}`;
      keys
        .slice(1)
        .forEach(
          (i, key) =>
            (result += `&${keys[0]}=${filterObject[keys[0]].toString()}`)
        );
    }

    return result;
  }

  async findOne(filter: Partial<T>={}, authorization?: string): Promise<T> {
    const a = await this.api.get<T>(
      `/cruds/${this.endpoint}/one${this.fromObjectToQuery(filter)}`,
      authorization
    );
    return a;
  }

  find(filter: Partial<T>={}, authorization?: string): Promise<T[]> {
    return this.api.get<T[]>(
      `/cruds/${this.endpoint}${this.fromObjectToQuery(filter)}`,
      authorization
    );
  }

  deleteOne(filter: Partial<T>={}, authorization?: string): Promise<string> {
    return this.api.delete<string>(
      `/cruds/${this.endpoint}${this.fromObjectToQuery(filter)}`,
      authorization
    );
  }

  insertOne(object: Partial<T>, authorization?: string): Promise<string> {
    return this.api.post<string>(
      `/cruds/${this.endpoint}`,
      object,
      authorization
    )
  }

  updateOne(filter: Partial<T>={}, object: Partial<T>, authorization?: string): Promise<string> {
    return this.api.put<string>(
      `/cruds/${this.endpoint}${this.fromObjectToQuery(filter)}`,
      object,
      authorization
    )
  }
}
