import { Component, OnInit } from "@angular/core";
import { KeycloakService } from "keycloak-angular";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(private keacloak: KeycloakService) {}

  ngOnInit(): void {}

  get isLoggedIn() {
    return this.keacloak.isLoggedIn();
  }
  signOut() {
    this.keacloak.getKeycloakInstance();
    this.keacloak.logout();
    //this.router.navigateByUrl("/login");
  }
}
