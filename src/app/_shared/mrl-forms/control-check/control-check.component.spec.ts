import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ControlCheckComponent } from './control-check.component';

describe('ControlCheckComponent', () => {
  let component: ControlCheckComponent;
  let fixture: ComponentFixture<ControlCheckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ControlCheckComponent]
    });
    fixture = TestBed.createComponent(ControlCheckComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('getInputId', () => {
    it('makes expected calls', () => {
      spyOn(component, 'hasLabel').and.callThrough();
      component.getInputId();
      expect(component.hasLabel).toHaveBeenCalled();
    });
  });
});
