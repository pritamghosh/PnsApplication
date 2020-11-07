import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSummaryCardComponent } from './profile-summary-card.component';

describe('ProfileSummaryCardComponent', () => {
  let component: ProfileSummaryCardComponent;
  let fixture: ComponentFixture<ProfileSummaryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSummaryCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
