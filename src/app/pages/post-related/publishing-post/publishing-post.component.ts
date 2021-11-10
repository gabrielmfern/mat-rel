import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PostService } from 'src/app/_shared/services/cruds/post.service';
import { AuthService } from 'src/app/_shared/services/auth.service';

import { Post } from 'src/app/_shared/modals/post.modal';

@Component({
  selector: 'mrl-publishing-post',
  templateUrl: './publishing-post.component.html',
  styleUrls: ['./publishing-post.component.scss']
})
export class PublishingPostComponent implements OnInit {
  loading = false;

  postForm: FormGroup;

  previewTitle: string = 'Regarding $\\pi(x)$ and $\\frac{x}{ln{x}}$';
  previewText: string =
    'Let $\\pi(x)$ denote the amount of prime numbers that are $\\leq x$ in such way that for example, $\\pi(10)=4$, because there are 4 prime numbers up to 10, that are all 2,3,5,7 [...]';

  editing = false;
  editingId: string;
  editingPost: Post;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService
  ) {
    this.postForm = fb.group({
      title: [
        'Regarding $\\pi(x)$ and $\\frac{x}{\\ln{x}}$',
        [Validators.required, Validators.minLength(12), Validators.maxLength(60)]
      ],
      text: [
        'Let $\\pi(x)$ denote the amount of prime numbers that are $\\leq x$ in such way that for example, $\\pi(10)=4$, because there are 4 prime numbers up to 10, that are all 2,3,5,7 [...]',
        [Validators.required, Validators.minLength(100)]
      ]
    });
  }

  public ngOnInit() {
    this.route.params.subscribe(async (params) => {
      if (params.id) {
        this.editing = true;
        this.editingId = params.id;
        this.loading = true;
        try {
          this.editingPost = await this.postService.findOne(
            {
              _id: params.id
            },
            this.authService.getAuthorization()
          );
          this.postForm.patchValue({
            title: this.editingPost.title,
            text: this.editingPost.text
          });
          this.previewTitle = this.editingPost.title;
          this.previewText = this.editingPost.text;
          this.onTextFocusedOut();
        } catch (exception) {
          console.error(exception);
          this.router.navigate(['/']);
        }
        this.loading = false;
      }
    });
  }

  public async submitForm() {
    if (this.postForm.valid) {
      const newPost: Partial<Post> = this.postForm.value;
      this.loading = true;
      if (this.editing) {
        await this.postService.updateOne(
          {
            _id: this.editingId
          },
          newPost,
          this.authService.getAuthorization()
        );
      } else {
        await this.postService.insertOne(newPost, this.authService.getAuthorization());
      }
      this.loading = false;
      this.router.navigate(['/']);
    }
  }

  public onTextFocusedOut() {
    this.previewText = this.getControl('text').value;
  }

  public onTitlteFocusedOut() {
    this.previewTitle = this.getControl('title').value;
  }

  public getControl(name: string): FormControl {
    return this.postForm.get(name) as FormControl;
  }
}
