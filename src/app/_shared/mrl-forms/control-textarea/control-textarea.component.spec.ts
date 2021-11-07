import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ControlTextareaComponent } from './control-textarea.component';

describe('ControlTextareaComponent', () => {
  let component: ControlTextareaComponent;
  let fixture: ComponentFixture<ControlTextareaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ControlTextareaComponent]
    });
    fixture = TestBed.createComponent(ControlTextareaComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`rows has default value`, () => {
    expect(component.rows).toEqual(10);
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
