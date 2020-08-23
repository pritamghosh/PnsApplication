import { Component, OnInit } from "@angular/core";
import { KeycloakService } from "keycloak-angular";
import { Router, NavigationStart } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(private keacloak: KeycloakService, private router: Router) {}
  activeRoute: string;
  username: string;
  ngOnInit(): void {
    this.keacloak.loadUserProfile().then((res) => {
      this.username = res.firstName + " " + res.lastName;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        let arr: string[] = event.url.split("/");
        if (arr != undefined && arr.length > 1) {
          this.activeRoute = arr[1].split("?")[0];
        }
      }
    });
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
