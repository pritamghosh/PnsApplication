import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiffrenceLabelComponent } from './diffrence-label.component';

describe('DiffrenceLabelComponent', () => {
  let component: DiffrenceLabelComponent;
  let fixture: ComponentFixture<DiffrenceLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiffrenceLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiffrenceLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
