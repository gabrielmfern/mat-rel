import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { PostService } from 'src/app/_shared/services/cruds/post.service';
import { PerfilComponent } from './perfil.component';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  beforeEach(() => {
    const formBuilderStub = () => ({ group: object => ({}) });
    const authServiceStub = () => ({
      getLoggedUser: () => ({ _id: {}, name: {} }),
      getAuthorization: () => ({}),
      updateAccount: (name, email, currentPassword, newPassword) => ({}),
      signIn: (email, arg) => ({})
    });
    const postServiceStub = () => ({
      find: (object, arg) => ({ then: () => ({ then: () => ({}) }) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PerfilComponent],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: AuthService, useFactory: authServiceStub },
        { provide: PostService, useFactory: postServiceStub }
      ]
    });
    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  // it(`posts has default value`, () => {
  //   expect(component.posts).toEqual([]);
  // });

  // it(`loading has default value`, () => {
  //   expect(component.loading).toEqual(false);
  // });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'setFormDataBasedOnLoggedUser').and.callThrough();
  //     spyOn(component, 'getAllPostsFromLoggedUser').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.setFormDataBasedOnLoggedUser).toHaveBeenCalled();
  //     expect(component.getAllPostsFromLoggedUser).toHaveBeenCalled();
  //   });
  // });

  // describe('getAllPostsFromLoggedUser', () => {
  //   it('makes expected calls', () => {
  //     const authServiceStub: AuthService = fixture.debugElement.injector.get(
  //       AuthService
  //     );
  //     const postServiceStub: PostService = fixture.debugElement.injector.get(
  //       PostService
  //     );
  //     spyOn(authServiceStub, 'getLoggedUser').and.callThrough();
  //     spyOn(authServiceStub, 'getAuthorization').and.callThrough();
  //     spyOn(postServiceStub, 'find').and.callThrough();
  //     component.getAllPostsFromLoggedUser();
  //     expect(authServiceStub.getLoggedUser).toHaveBeenCalled();
  //     expect(authServiceStub.getAuthorization).toHaveBeenCalled();
  //     expect(postServiceStub.find).toHaveBeenCalled();
  //   });
  // });

  // describe('setFormDataBasedOnLoggedUser', () => {
  //   it('makes expected calls', () => {
  //     const authServiceStub: AuthService = fixture.debugElement.injector.get(
  //       AuthService
  //     );
  //     spyOn(authServiceStub, 'getLoggedUser').and.callThrough();
  //     component.setFormDataBasedOnLoggedUser();
  //     expect(authServiceStub.getLoggedUser).toHaveBeenCalled();
  //   });
  // });

  // describe('getUsername', () => {
  //   it('makes expected calls', () => {
  //     const authServiceStub: AuthService = fixture.debugElement.injector.get(
  //       AuthService
  //     );
  //     spyOn(authServiceStub, 'getLoggedUser').and.callThrough();
  //     component.getUsername();
  //     expect(authServiceStub.getLoggedUser).toHaveBeenCalled();
  //   });
  // });
});
