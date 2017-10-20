import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSandwichComponent } from './custom-sandwich.component';

describe('CustomSandwichComponent', () => {
  let component: CustomSandwichComponent;
  let fixture: ComponentFixture<CustomSandwichComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSandwichComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSandwichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
