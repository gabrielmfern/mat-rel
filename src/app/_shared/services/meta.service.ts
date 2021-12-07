import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  constructor(private meta: Meta, private title: Title){}

  setTitle(pageTitle: string) {
    this.title.setTitle(`MatRel - ${pageTitle}`);
  }

  setTag(tagName: string, content: string) {
    console.log(this.meta.getTag(`name=${tagName}`))
    if (this.meta.getTag(`name=${tagName}`)) {
      this.meta.updateTag({
        name: tagName,
        content
      }, `name=${tagName}`)
    } else {
      this.meta.addTag({
        name: tagName,
        content
      });
    }
  }
}
