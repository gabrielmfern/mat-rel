import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { PostService } from 'src/app/_shared/services/cruds/post.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    const authServiceStub = () => ({ getAuthorization: () => ({}) });
    const postServiceStub = () => ({
      find: (object, arg) => ({ then: () => ({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeComponent],
      providers: [
        { provide: AuthService, useFactory: authServiceStub },
        { provide: PostService, useFactory: postServiceStub }
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
