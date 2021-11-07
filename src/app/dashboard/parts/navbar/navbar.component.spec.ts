import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_shared/services/auth.service';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: (array) => ({}) });
    const authServiceStub = () => ({
      signOut: () => ({}),
      getLoggedUser: () => ({ name: {} })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NavbarComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('logout', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const authServiceStub: AuthService = fixture.debugElement.injector.get(AuthService);
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(authServiceStub, 'signOut').and.callThrough();
      component.logout();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(authServiceStub.signOut).toHaveBeenCalled();
    });
  });

  describe('getUsername', () => {
    it('makes expected calls', () => {
      const authServiceStub: AuthService = fixture.debugElement.injector.get(AuthService);
      spyOn(authServiceStub, 'getLoggedUser').and.callThrough();
      component.getUsername();
      expect(authServiceStub.getLoggedUser).toHaveBeenCalled();
    });
  });
});
