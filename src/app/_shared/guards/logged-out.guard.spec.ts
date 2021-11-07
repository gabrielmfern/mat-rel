import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoggedOutGuard } from './logged-out.guard';

describe('LoggedOutGuard', () => {
  let service: LoggedOutGuard;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const authServiceStub = () => ({ verifyIfLogged: () => ({}) });
    TestBed.configureTestingModule({
      providers: [
        LoggedOutGuard,
        { provide: Router, useFactory: routerStub },
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });
    service = TestBed.inject(LoggedOutGuard);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  // describe('canActivate', () => {
  //   it('makes expected calls', () => {
  //     const routerStub: Router = TestBed.inject(Router);
  //     const authServiceStub: AuthService = TestBed.inject(AuthService);
  //     spyOn(routerStub, 'navigate').and.callThrough();
  //     spyOn(authServiceStub, 'verifyIfLogged').and.callThrough();
  //     service.canActivate();
  //     expect(routerStub.navigate).toHaveBeenCalled();
  //     expect(authServiceStub.verifyIfLogged).toHaveBeenCalled();
  //   });
  // });
});
