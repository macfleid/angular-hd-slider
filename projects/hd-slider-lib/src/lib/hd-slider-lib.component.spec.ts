import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HdSliderLibComponent } from './hd-slider-lib.component';

describe('HdSliderLibComponent', () => {
  let component: HdSliderLibComponent;
  let fixture: ComponentFixture<HdSliderLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HdSliderLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HdSliderLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
