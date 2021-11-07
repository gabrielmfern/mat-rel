import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { PostService } from 'src/app/_shared/services/cruds/post.service';
import { PostComponent } from './post.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(() => {
    const activatedRouteStub = () => ({ params: { subscribe: f => f({}) } });
    const routerStub = () => ({ navigate: array => ({}) });
    const authServiceStub = () => ({
      getLoggedUser: () => ({}),
      getAuthorization: () => ({})
    });
    const postServiceStub = () => ({
      findOne: (object, arg) => ({}),
      agree: (object, arg) => ({}),
      disagree: (object, arg) => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PostComponent],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: AuthService, useFactory: authServiceStub },
        { provide: PostService, useFactory: postServiceStub }
      ]
    });
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  // it(`loading has default value`, () => {
  //   expect(component.loading).toEqual(false);
  // });

  // it(`isAuthor has default value`, () => {
  //   expect(component.isAuthor).toEqual(true);
  // });

  // it(`hasAgreed has default value`, () => {
  //   expect(component.hasAgreed).toEqual(false);
  // });

  // it(`hasDisagreed has default value`, () => {
  //   expect(component.hasDisagreed).toEqual(false);
  // });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const routerStub: Router = fixture.debugElement.injector.get(Router);
  //     const authServiceStub: AuthService = fixture.debugElement.injector.get(
  //       AuthService
  //     );
  //     spyOn(component, 'loadPost').and.callThrough();
  //     spyOn(routerStub, 'navigate').and.callThrough();
  //     spyOn(authServiceStub, 'getLoggedUser').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.loadPost).toHaveBeenCalled();
  //     expect(routerStub.navigate).toHaveBeenCalled();
  //     expect(authServiceStub.getLoggedUser).toHaveBeenCalled();
  //   });
  // });
});
