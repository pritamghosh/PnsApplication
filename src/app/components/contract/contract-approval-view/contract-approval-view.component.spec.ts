import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ContractApprovalViewComponent } from "./contract-approval-view.component";

describe("ContractViewComponent", () => {
  let component: ContractApprovalViewComponent;
  let fixture: ComponentFixture<ContractApprovalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContractApprovalViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractApprovalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
