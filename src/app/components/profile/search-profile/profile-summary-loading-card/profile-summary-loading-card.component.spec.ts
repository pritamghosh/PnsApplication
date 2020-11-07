import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSummaryLoadingCardComponent } from './profile-summary-loading-card.component';

describe('ProfileSummaryLoadingCardComponent', () => {
  let component: ProfileSummaryLoadingCardComponent;
  let fixture: ComponentFixture<ProfileSummaryLoadingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSummaryLoadingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSummaryLoadingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
