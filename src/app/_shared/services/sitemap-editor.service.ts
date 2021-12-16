import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SitemapEditorService {
  private BASE_URL: string = 'https://mat-rel.com/#/';

  constructor(private httpClient: HttpClient) {}

  getUrlsFrom(filename: string): Observable<string[]> {
    return this.httpClient.get<string>(filename).pipe(map((urls) => urls.split('\n')));
  }

  async addUriOn(filename: string, uri: string) {
    const urls = await this.getUrlsFrom(filename).toPromise();
    const newUrl = this.BASE_URL + uri
    if (urls.includes(newUrl)) return;
    urls.push(newUrl);
    await this.httpClient.post('./sitemap.txt', urls.join('\n')).toPromise();
  }
}
