import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusyDisplayComponent } from './busy-display.component';

describe('BusyDisplayComponent', () => {
  let component: BusyDisplayComponent;
  let fixture: ComponentFixture<BusyDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusyDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusyDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
