import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ControlInputComponent } from './control-input.component';

describe('ControlInputComponent', () => {
  let component: ControlInputComponent;
  let fixture: ComponentFixture<ControlInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ControlInputComponent]
    });
    fixture = TestBed.createComponent(ControlInputComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`type has default value`, () => {
    expect(component.type).toEqual(`text`);
  });

  it(`validate has default value`, () => {
    expect(component.validate).toEqual(true);
  });

  // describe('onFocusedOut', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'setErrorMessageAndValidState').and.callThrough();
  //     component.onFocusedOut();
  //     expect(component.setErrorMessageAndValidState).toHaveBeenCalled();
  //   });
  // });

  // describe('setErrorMessageAndValidState', () => {
  //   it('makes expected calls', () => {
  //     spyOn(component, 'getErrorMessage').and.callThrough();
  //     spyOn(component, 'isValid').and.callThrough();
  //     component.setErrorMessageAndValidState();
  //     expect(component.getErrorMessage).toHaveBeenCalled();
  //     expect(component.isValid).toHaveBeenCalled();
  //   });
  // });

  describe('getInputId', () => {
    it('makes expected calls', () => {
      spyOn(component, 'hasLabel').and.callThrough();
      component.getInputId();
      expect(component.hasLabel).toHaveBeenCalled();
    });
  });
});
