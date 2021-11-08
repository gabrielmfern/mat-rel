import { ApiService } from '../api.service';

export abstract class CrudBaseService<T> {
  constructor(protected api: ApiService, protected endpoint: string) {}

  protected fromObjectToQuery(filterObject: { [key: string]: any }): string {
    const keys = Object.keys(filterObject);
    let result = '';

    keys.forEach((key, i) => {
      const char = i == 0 ? '?' : '&';
      result += `${char}${key}=${filterObject[key]}`;
    });

    return result;
  }

  async findOne(filter: Partial<T> = {}, authorization?: string): Promise<T> {
    const a = await this.api.get<T>(
      `/cruds/${this.endpoint}/one${this.fromObjectToQuery(filter)}`,
      authorization
    );
    return a;
  }

  find<K = T[]>(filter: Partial<T> = {}, authorization?: string): Promise<K> {
    return this.api.get<K>(`/cruds/${this.endpoint}${this.fromObjectToQuery(filter)}`, authorization);
  }

  deleteOne(filter: Partial<T> = {}, authorization?: string): Promise<string> {
    return this.api.delete<string>(`/cruds/${this.endpoint}${this.fromObjectToQuery(filter)}`, authorization);
  }

  insertOne(object: Partial<T>, authorization?: string): Promise<T> {
    return this.api.post<T>(`/cruds/${this.endpoint}`, object, authorization);
  }

  updateOne(filter: Partial<T> = {}, object: Partial<T>, authorization?: string): Promise<string> {
    return this.api.put<string>(
      `/cruds/${this.endpoint}${this.fromObjectToQuery(filter)}`,
      object,
      authorization
    );
  }
}
