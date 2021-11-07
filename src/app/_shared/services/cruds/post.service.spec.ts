import { TestBed } from '@angular/core/testing';
import { ApiService } from '../api.service';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    const apiServiceStub = () => ({ get: (arg, authorization) => ({}) });
    TestBed.configureTestingModule({
      providers: [
        PostService,
        { provide: ApiService, useFactory: apiServiceStub }
      ]
    });
    service = TestBed.inject(PostService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
