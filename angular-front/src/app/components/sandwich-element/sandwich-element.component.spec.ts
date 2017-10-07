import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandwichElementComponent } from './sandwich-element.component';

describe('SandwichElementComponent', () => {
  let component: SandwichElementComponent;
  let fixture: ComponentFixture<SandwichElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandwichElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandwichElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
