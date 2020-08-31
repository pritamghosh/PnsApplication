import { TestBed } from "@angular/core/testing";

import { EmployeeProfileService } from "./employee-profile.service";

describe("ProfileService", () => {
  let service: EmployeeProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeProfileService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
