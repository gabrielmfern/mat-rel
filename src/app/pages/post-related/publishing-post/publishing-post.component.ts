import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PostService } from 'src/app/_shared/services/cruds/post.service';
import { AuthService } from 'src/app/_shared/services/auth.service';

import { Post } from 'src/app/_shared/modals/post.modal';
import { MetaService } from 'src/app/_shared/services/meta.service';

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

  availableTags = [
    {
      name: 'Number Theory',
      value: 'Number Theory'
    },
    { name: 'Zeta Function', value: 'Zeta Function' },
    { name: 'Calculus', value: 'Calculus' },
    { name: 'Real Analysis', value: 'Real Analysis' },
    { name: 'Functions', value: 'Functions' },
    { name: 'Sequences', value: 'Sequences' },
    { name: 'Series', value: 'Series' },
    { name: 'Limits', value: 'Limits' },
    { name: 'Prime Numbers', value: 'Prime Numbers' }
  ];

  tags: string[] = [];
  tagControl = new FormControl('Number Theory');

  constructor(
    fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService,
    private metaService: MetaService
  ) {
    this.postForm = fb.group({
      title: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(60)]],
      text: ['', [Validators.required, Validators.minLength(100)]],
      public: [true, [Validators.required]]
    });
  }

  getAvailableTags() {
    return this.availableTags.filter((tag) => !this.tags.includes(tag.name));
  }

  getRandomAvailableTag() {
    const tags = this.getAvailableTags();
    const randomIndex = Math.floor(Math.random() * tags.length);
    return tags[randomIndex];
  }

  addTag(tag: string) {
    if (this.tags.includes(tag) || this.tags.length == 4) return;
    this.tags.push(tag);
    this.tagControl.patchValue(this.getRandomAvailableTag().name);
  }

  removeTag(tag: string) {
    const index = this.tags.findIndex((_tag) => _tag == tag);
    this.tags.splice(index, 1);
    if (this.getAvailableTags().length == 1) {
      this.tagControl.patchValue(this.getAvailableTags()[0].value);
    }
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
            text: this.editingPost.text,
            public: this.editingPost.public
          });
          if (this.editingPost.tags) this.tags = this.editingPost.tags.split(',');
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

    this.metaService.setTag('description', 'New Publication');
    this.metaService.setTag('author', 'Gabriel Miranda');
    this.metaService.setTag(
      'keywords',
      'matrel, math discoveries, math, mathematics, discoveries, gabriel miranda, homepage, what is matrel, mat rel'
    );
    this.metaService.setTitle('Post Formulary');
  }

  public async submitForm() {
    if (this.postForm.valid && this.tags.length >= 1 && this.tags.length <= 4) {
      const newPost: any = this.postForm.value;
      newPost.tags = this.tags;
      this.loading = true;
      try {
        if (this.editing) {
          await this.postService.updateOne(
            {
              _id: this.editingId
            },
            newPost as any,
            this.authService.getAuthorization()
          );
        } else {
          const post = await this.postService.insertOne(newPost as any, this.authService.getAuthorization());
        }
        this.router.navigate(['/']);
      } catch (exception) {
        console.error(exception);
      }
      this.loading = false;
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
