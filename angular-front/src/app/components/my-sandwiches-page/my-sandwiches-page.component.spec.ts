import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySandwichesPageComponent } from './my-sandwiches-page.component';

describe('MySandwichesPageComponent', () => {
  let component: MySandwichesPageComponent;
  let fixture: ComponentFixture<MySandwichesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySandwichesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySandwichesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
