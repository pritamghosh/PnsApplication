import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CustomerComponent } from "./components/customer/customer.component";
import { ContractComponent } from "./components/contract/contract.component";
import { EquipmentComponent } from "./components/equipment/equipment.component";
import { AuthGuardService } from "./services/auth.guard.service";
import { ProfileViewComponent } from "./components/profile/profile-view/profile-view.component";
import { ProfileFormComponent } from "./components/profile/profile-form/profile-form.component";

const routes: Routes = [
  {
    path: "customer",
    canActivate: [AuthGuardService],
    data: { roles: ["contractMenu"] },
    component: CustomerComponent,
  },
  {
    path: "equipment",
    canActivate: [AuthGuardService],
    data: { roles: ["contractMenu"] },
    component: EquipmentComponent,
  },
  {
    path: "contract",
    canActivate: [AuthGuardService],
    data: { roles: ["contractMenu"] },
    component: ContractComponent,
  },
  {
    path: "profile",
    canActivate: [AuthGuardService],
    component: ProfileViewComponent,
  },
  {
    path: "employee/profile/create",
    canActivate: [AuthGuardService],
    component: ProfileFormComponent,
  },
  { path: "", redirectTo: "contract", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
