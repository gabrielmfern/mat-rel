import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  constructor(private meta: Meta, private title: Title){}

  setTitle(pageTitle: string) {
    this.title.setTitle(`MatRel - ${pageTitle}`);
    this.setTag('title', `MatRel - ${pageTitle}`);
  }

  setTag(tagName: string, content: string) {
    if (this.meta.getTag(`name=${tagName}`)) {
      this.meta.updateTag({
        name: tagName,
        content
      }, `name=${tagName}`);
      this.meta.updateTag({
        name: `og:${tagName}`,
        content
      }, `name='og:${tagName}'`)
    } else {
      this.meta.addTag({
        name: tagName,
        content
      });
      this.meta.addTag({
        name: `og:${tagName}`,
        content
      });
    }
  }
}
