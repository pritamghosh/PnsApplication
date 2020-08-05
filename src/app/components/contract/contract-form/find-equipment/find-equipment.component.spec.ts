import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindEquipmentComponent } from './find-equipment.component';

describe('FindEquipmentComponent', () => {
  let component: FindEquipmentComponent;
  let fixture: ComponentFixture<FindEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
