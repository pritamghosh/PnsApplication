import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CustomerComponent } from "./components/customer/customer.component";
import { ContractComponent } from "./components/contract/contract.component";
import { EquipmentComponent } from "./components/equipment/equipment.component";
import { AuthGuardService } from "./services/auth.guard.service";
import { ProfileViewComponent } from "./components/profile/profile-view/profile-view.component";
import { ProfileFormComponent } from "./components/profile/profile-form/profile-form.component";
import { HomeComponent } from "./components/home/home.component";
import { MyProfileComponent } from "./components/profile/my-profile/my-profile.component";
import { OtherProfileComponent } from "./components/profile/other-profile/other-profile.component";
import { SearchProfileComponent } from "./components/profile/search-profile/search-profile.component";
import { LeaveComponent } from "./components/leave/leave.component";

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
    path: "myprofile",
    canActivate: [AuthGuardService],
    component: MyProfileComponent,
  },
  {
    path: "profile/:id",
    canActivate: [AuthGuardService],
    component: OtherProfileComponent,
  },
  {
    path: "employee",
    canActivate: [AuthGuardService],
    children: [
      {
        path: "profile",
        children: [
          {
            path: "create",
            component: ProfileFormComponent,
          },
          {
            path: "search",
            component: SearchProfileComponent,
          },
        ],
      },
      {
        path: "leave",
        canActivate: [AuthGuardService],
        component: LeaveComponent,
      },
    ],
  },

  {
    path: "",
    canActivate: [AuthGuardService],
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
