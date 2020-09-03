import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadialProgressChartComponent } from './radial-progress-chart.component';

describe('RadialProgressChartComponent', () => {
  let component: RadialProgressChartComponent;
  let fixture: ComponentFixture<RadialProgressChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadialProgressChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadialProgressChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
