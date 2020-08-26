import { Injectable } from "@angular/core";
import { KeycloakService } from "keycloak-angular";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  constructor(private keycloak: KeycloakService) {}

  has(role: string) {
    return this.keycloak.getUserRoles().includes(role);
  }
  hasDelete() {
    return this.has("delete");
  }
  hasEdit() {
    return this.has("update");
  }
  hasAdd() {
    return this.has("create");
  }
  hasView() {
    return this.has("read");
  }
  hasContractApprover() {
    return this.has("contract_approver");
  }
}
