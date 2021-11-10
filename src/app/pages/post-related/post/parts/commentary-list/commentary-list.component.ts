import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { CommentaryService } from 'src/app/_shared/services/cruds/commentary.service';

import { Post } from 'src/app/_shared/modals/post.modal';
import { Commentary } from 'src/app/_shared/modals/commentary.modal';
import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
  selector: 'mrl-commentary-list',
  templateUrl: './commentary-list.component.html',
  styleUrls: ['./commentary-list.component.scss']
})
export class CommentaryListComponent implements OnInit {
  @Input() post: Post;

  loading = false;
  commentaries: Commentary[] = [];
  currentPage = 0;
  pageAmount = 1;

  hoveringOnCommentary: Commentary;

  commentaryTextControl: FormControl = new FormControl('', [Validators.required]);

  constructor(private commentaryService: CommentaryService, public authService: AuthService) {}

  async ngOnInit() {
    if (this.post) {
      this.loadMoreCommentaries();
    } else {
      setTimeout(() => {
        this.ngOnInit();
      }, 1000);
    }
  }

  async loadMoreCommentaries() {
    if (this.currentPage < this.pageAmount) {
      this.loading = true;
      try {
        const response = await this.commentaryService.find<{
          records: Commentary[];
          page: number;
          pageAmount: number;
        }>(
          {
            'post._id': this.post._id,
            page: this.currentPage
          } as any
        );
        this.pageAmount = response.pageAmount;
        if (this.currentPage < this.pageAmount) this.currentPage++;
        this.commentaries.push(...response.records);
      } catch (exception) {
        console.log(exception);
        this.pageAmount = 0;
      }
      this.loading = false;
    }
  }

  isHoveringOn(commentary: Commentary): boolean {
    if (!this.hoveringOnCommentary) return false;
    return commentary._id == this.hoveringOnCommentary._id;
  }

  isAuthorOf(commentary: Commentary): boolean {
    if (!this.authService.isLoggedIn) return false;
    return commentary.user._id == this.authService.getLoggedUser()._id;
  }

  async comment() {
    if (this.commentaryTextControl.valid) {
      this.loading = true;
      const commentary = await this.commentaryService.insertOne(
        {
          postId: this.post._id,
          text: this.commentaryTextControl.value
        } as any,
        this.authService.getAuthorization()
      );
      this.loading = false;
      this.commentaryTextControl.patchValue('');

      this.commentaries.push(commentary);
    }
  }

  async deleteCommentary(commentary: Commentary) {
    if (confirm('Are you sure you want to delete this commentary?')) {
      this.loading = true;
      await this.commentaryService.deleteOne(
        {
          _id: commentary._id
        },
        this.authService.getAuthorization()
      );
      this.commentaries.splice(
        this.commentaries.findIndex((c) => c._id == commentary._id),
        1
      );
      this.loading = false;
    }
  }
}
