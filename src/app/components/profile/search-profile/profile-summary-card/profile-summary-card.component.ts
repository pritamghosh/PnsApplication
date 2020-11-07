import { Component, OnInit, Input } from "@angular/core";
import { EmployeeProfileModel } from "src/app/models/employee.profile.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile-summary-card",
  templateUrl: "./profile-summary-card.component.html",
  styleUrls: ["./profile-summary-card.component.scss"],
})
export class ProfileSummaryCardComponent implements OnInit {
  @Input("profile") profile: EmployeeProfileModel;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  get image() {
    if (this.profile?.image != null) {
      return "data:image/bmp;base64," + this.profile?.image;
    }
    return null;
  }

  get name() {
    // (this.profile.middleName != null ? " " + this.profile?.middleName : "") +
    return `${this.profile.firstName} ${this.profile.familyName} (${this.profile.employeeId})`;
  }

  get initial() {
    return (
      "" +
      this.profile?.firstName.charAt(0) +
      this.profile?.familyName.charAt(0)
    ).toUpperCase();
  }

  openProfile() {
    this.router.navigate([`profile/${this.profile.employeeId}`]);
  }
}
