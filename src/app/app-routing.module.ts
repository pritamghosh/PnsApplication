import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CustomerComponent } from "./components/customer/customer.component";
import { ContractComponent } from "./components/contract/contract.component";
import { EquipmentComponent } from "./components/equipment/equipment.component";
import { AuthGuardService } from "./services/auth-guard.service";

const routes: Routes = [
  {
    path: "customer",
    canActivate: [AuthGuardService],
    component: CustomerComponent,
  },
  {
    path: "equipment",
    canActivate: [AuthGuardService],
    component: EquipmentComponent,
  },
  {
    path: "contract",
    canActivate: [AuthGuardService],
    component: ContractComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
