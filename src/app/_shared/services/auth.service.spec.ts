import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    const apiServiceStub = () => ({
      get: (string, arg) => ({ valid: {} }),
      post: (string, object, arg) => ({ authorization: {} })
    });
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: ApiService, useFactory: apiServiceStub }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('verifyIfLogged', () => {
    it('makes expected calls', () => {
      const apiServiceStub: ApiService = TestBed.inject(ApiService);
      spyOn(apiServiceStub, 'get').and.callThrough();
      service.verifyIfLogged();
      expect(apiServiceStub.get).toHaveBeenCalled();
    });
  });
});
