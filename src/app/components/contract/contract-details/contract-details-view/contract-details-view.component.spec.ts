import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDetailsViewComponent } from './contract-details-view.component';

describe('ContractDetailsViewComponent', () => {
  let component: ContractDetailsViewComponent;
  let fixture: ComponentFixture<ContractDetailsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractDetailsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
