import { PublishingPostModule } from './publishing-post.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishingPostComponent } from './publishing-post.component';

describe('PublishingPostComponent', () => {
  let component: PublishingPostComponent;
  let fixture: ComponentFixture<PublishingPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishingPostModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PublishingPostComponent);
    component = fixture.componentInstance;
  });

  // it('Should create component', () => {
  //   expect(component).toBeTruthy();
  // });

  // it(`loading has default value`, () => {
  //   expect(component.loading).toEqual(false);
  // });

  // it(`editing has default value`, () => {
  //   expect(component.editing).toEqual(false);
  // });

  // describe('ngOnInit', () => {
  //   it('makes expected calls', () => {
  //     const routerStub: Router = fixture.debugElement.injector.get(Router);
  //     const postServiceStub: PostService = fixture.debugElement.injector.get(
  //       PostService
  //     );
  //     const authServiceStub: AuthService = fixture.debugElement.injector.get(
  //       AuthService
  //     );
  //     spyOn(component, 'onTextFocusedOut').and.callThrough();
  //     spyOn(routerStub, 'navigate').and.callThrough();
  //     spyOn(postServiceStub, 'findOne').and.callThrough();
  //     spyOn(authServiceStub, 'getAuthorization').and.callThrough();
  //     component.ngOnInit();
  //     expect(component.onTextFocusedOut).toHaveBeenCalled();
  //     expect(routerStub.navigate).toHaveBeenCalled();
  //     expect(postServiceStub.findOne).toHaveBeenCalled();
  //     expect(authServiceStub.getAuthorization).toHaveBeenCalled();
  //   });
  // });

  // describe('onTextFocusedOut', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'getControl').and.callThrough();
  //     component.onTextFocusedOut();
  //     expect(component.getControl).toHaveBeenCalled();
  //   });
  // });
});
