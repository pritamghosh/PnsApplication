import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveCardComponent } from './leave-card.component';

describe('LeaveCardComponent', () => {
  let component: LeaveCardComponent;
  let fixture: ComponentFixture<LeaveCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
