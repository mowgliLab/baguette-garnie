import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandwichDetailsComponent } from './sandwich-details.component';

describe('SandwichDetailsComponent', () => {
  let component: SandwichDetailsComponent;
  let fixture: ComponentFixture<SandwichDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandwichDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandwichDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
