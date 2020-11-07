import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { EmployeeProfileModel } from "src/app/models/employee.profile.model";
import { EmployeeProfileService } from "src/app/services/employee-profile.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-profile-view",
  templateUrl: "./profile-view.component.html",
  styleUrls: ["./profile-view.component.scss"],
})
export class ProfileViewComponent implements OnInit {
  opacity = 0;
  @Input("profile") profile: EmployeeProfileModel;
  @Input("myProfile") myProfile = false;
  imageFc = new FormControl();

  get image() {
    if (this.profile?.image != null) {
      return "data:image/bmp;base64," + this.profile?.image;
    }
    return null;
  }

  get name() {
    return (
      this.profile.firstName +
      (this.profile.middleName != null ? " " + this.profile?.middleName : "") +
      " " +
      this.profile.familyName
    );
  }

  get initial() {
    return (
      "" +
      this.profile?.firstName.charAt(0) +
      this.profile?.familyName.charAt(0)
    );
  }
  constructor(
    private service: EmployeeProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  uploadImage(event: any) {
    let files = event.target.files;
    const reader = new FileReader();
    const file = files[0];
    this.imageFc.setValue(null);
    if (!file.type.match(/image.*/)) {
      window.alert("Please Upload Valid Image");
      return;
    }
    this.service
      .uploadImage(file)
      .subscribe((p: EmployeeProfileModel) => (this.profile = p));
  }

  openProfile(id: string) {
    this.router.navigate([`profile/${id}`]);
  }
}
