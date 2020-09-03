import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmCardComponent } from './rm-card.component';

describe('RmCardComponent', () => {
  let component: RmCardComponent;
  let fixture: ComponentFixture<RmCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
