import { Component, OnInit } from "@angular/core";
import { EmployeeProfileModel } from "src/app/models/employee.profile.model";
import { EmployeeProfileService } from "src/app/services/employee-profile.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  profile: EmployeeProfileModel;
  hrProfile: EmployeeProfileModel;
  rmProfile: EmployeeProfileModel;
  constructor(private service: EmployeeProfileService) {}

  ngOnInit(): void {
    this.profile = this.service.profile;
    this.service
      .getProfile(this.profile != null)
      .subscribe((p: EmployeeProfileModel) => {
        this.hrProfile = p;
        this.rmProfile = p;
        this.profile = p;
      });
  }
}
