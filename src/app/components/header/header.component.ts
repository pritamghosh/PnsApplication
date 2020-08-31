import { Component, OnInit, AfterViewInit } from "@angular/core";
import { KeycloakService } from "keycloak-angular";
import { Router, NavigationStart } from "@angular/router";
import { EmployeeProfileService } from "src/app/services/employee-profile.service";
import { EmployeeProfileModel } from "src/app/models/employee.profile.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  constructor(
    private keacloak: KeycloakService,
    private router: Router,
    private profileService: EmployeeProfileService
  ) {}
  activeRoute: string;
  initial: string;
  profile: EmployeeProfileModel;
  ngOnInit(): void {
    this.keacloak.loadUserProfile().then((res) => {
      this.initial = "" + res.firstName?.charAt(0) + res.lastName?.charAt(0);
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        let arr: string[] = event.url.split("/");
        if (arr != undefined && arr.length > 1) {
          this.activeRoute =
            arr[1].split("?")[0] == "" ? "contract" : arr[1].split("?")[0];
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.profileService
      .getProfile(true)
      .subscribe((p: EmployeeProfileModel) => (this.profile = p));
  }

  get image() {
    if (this.profile?.image != null) {
      return "data:image/bmp;base64," + this.profile?.image;
    }
    return null;
  }

  get isLoggedIn() {
    return this.keacloak.isLoggedIn();
  }
  signOut() {
    this.keacloak.logout();
  }

  getBgColor(route: string) {
    if (route == this.activeRoute) {
      return "#6da943";
    }
    return "initial";
  }
}
