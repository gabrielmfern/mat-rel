import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoaderModule } from 'src/app/_shared/components/loader/loader.module';
import { MathjaxModule } from '../../mathjax/mathjax.module';

import { PostCardComponent } from './post-card.component';

@NgModule({
  imports: [CommonModule, MathjaxModule.forChild(), LoaderModule, RouterModule],
  declarations: [PostCardComponent],
  providers: [],
  exports: [PostCardComponent]
})
export class PostCardModule {}
