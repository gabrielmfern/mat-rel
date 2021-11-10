import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DonateComponent } from './donate.component';

describe('DonateComponent', () => {
  let component: DonateComponent;
  let fixture: ComponentFixture<DonateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DonateComponent]
    });
    fixture = TestBed.createComponent(DonateComponent);
    component = fixture.componentInstance;
  });

  it('should create component ', () => {
    expect(component).toBeTruthy();
  });
});
