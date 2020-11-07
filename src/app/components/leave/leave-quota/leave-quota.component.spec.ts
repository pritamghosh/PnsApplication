import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveQuotaComponent } from './leave-quota.component';

describe('LeaveQuotaComponent', () => {
  let component: LeaveQuotaComponent;
  let fixture: ComponentFixture<LeaveQuotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveQuotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveQuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
