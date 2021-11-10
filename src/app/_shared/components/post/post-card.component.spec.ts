import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { PostService } from 'src/app/_shared/services/cruds/post.service';
import { Router } from '@angular/router';
import { PostCardComponent } from './post-card.component';

describe('PostCardComponent', () => {
  let component: PostCardComponent;
  let fixture: ComponentFixture<PostCardComponent>;

  beforeEach(() => {
    const authServiceStub = () => ({
      getLoggedUser: () => ({}),
      getAuthorization: () => ({})
    });
    const postServiceStub = () => ({ deleteOne: (object, arg) => ({}) });
    const routerStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PostCardComponent],
      providers: [
        { provide: AuthService, useFactory: authServiceStub },
        { provide: PostService, useFactory: postServiceStub },
        { provide: Router, useFactory: routerStub }
      ]
    });
    fixture = TestBed.createComponent(PostCardComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`loading has default value`, () => {
    expect(component.loading).toEqual(false);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      spyOn(authServiceStub, 'getLoggedUser').and.callThrough();
      component.ngOnInit();
      expect(authServiceStub.getLoggedUser).toHaveBeenCalled();
    });
  });

  // describe('editPost', () => {
  //   it('makes expected calls', () => {
  //     const routerStub: Router = fixture.debugElement.injector.get(Router);
  //     spyOn(routerStub, 'navigate').and.callThrough();
  //     component.editPost();
  //     expect(routerStub.navigate).toHaveBeenCalled();
  //   });
  // });
});
