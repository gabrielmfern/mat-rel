import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoggedInGuard } from './logged-in.guard';

describe('LoggedInGuard', () => {
  let service: LoggedInGuard;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const authServiceStub = () => ({ verifyIfLogged: () => ({}) });
    TestBed.configureTestingModule({
      providers: [
        LoggedInGuard,
        { provide: Router, useFactory: routerStub },
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });
    service = TestBed.inject(LoggedInGuard);
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
