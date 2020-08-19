import { Component, OnInit } from "@angular/core";
import { KeycloakService } from "keycloak-angular";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(private keacloak: KeycloakService) {}

  username: string;
  ngOnInit(): void {
    this.keacloak.loadUserProfile().then((res) => {
      this.username = res.firstName + " " + res.lastName;
    });
  }

  get isLoggedIn() {
    return this.keacloak.isLoggedIn();
  }
  signOut() {
    this.keacloak.getKeycloakInstance();
    this.keacloak.logout();
  }
}
