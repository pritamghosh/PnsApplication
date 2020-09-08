import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { NgModule, APP_INITIALIZER, ErrorHandler } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatTabsModule } from "@angular/material/tabs";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDividerModule } from "@angular/material/divider";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSliderModule } from "@angular/material/slider";
import { MatChipsModule } from "@angular/material/chips";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDialogModule, MatDialog } from "@angular/material/dialog";
import { CustomerComponent } from "./components/customer/customer.component";
import { EquipmentComponent } from "./components/equipment/equipment.component";
import { ContractComponent } from "./components/contract/contract.component";
import { AlertComponent } from "./utility/alert/alert.component";
import { CustomerDetailsComponent } from "./components/customer/customer-details/customer-details.component";
import { EquipmentDetailsComponent } from "./components/equipment/equipment-details/equipment-details.component";
import { ContractDetailsComponent } from "./components/contract/contract-details/contract-details.component";
import { ContractFormComponent } from "./components/contract/contract-form/contract-form.component";
import { FindCustomerComponent } from "./components/contract/contract-form/find-customer/find-customer.component";
import { FindEquipmentComponent } from "./components/contract/contract-form/find-equipment/find-equipment.component";
import { CustomerFormComponent } from "./components/customer/customer-form/customer-form.component";
import { DatePipe } from "@angular/common";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { initializer } from "./init/auth-init";
import { KeycloakService, KeycloakAngularModule } from "keycloak-angular";
import { BusyDisplayComponent } from "./utility/busy-display/busy-display.component";
import { PnsInterInterceptorService } from "./services/pns-inter-interceptor.service";
import { NoRecordsFoundComponent } from "./utility/no-records-found/no-records-found.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { PnsErrorService } from "./services/pns-error.service";
import { DisableControlDirective } from "./driectives/disable-control.directive";
import { ContractApprovalComponent } from "./components/contract/contract-approval/contract-approval.component";
import { ContractApprovalViewComponent } from "./components/contract/contract-approval-view/contract-approval-view.component";
import { DiffrenceLabelComponent } from "./components/contract/contract-approval-view/diffrence-label/diffrence-label.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ProfileViewComponent } from "./components/profile/profile-view/profile-view.component";
import { ProfileElementComponent } from "./components/profile/profile-view/profile-element/profile-element.component";
import { ProfileFormComponent } from "./components/profile/profile-form/profile-form.component";
import { HasRoleDirective } from "./driectives/has-role.directive";
import { ContractDetailsViewComponent } from "./components/contract/contract-details/contract-details-view/contract-details-view.component";
import { HomeComponent } from "./components/home/home.component";
import { ProfileCardComponent } from "./components/home/profile-card/profile-card.component";
import { MyProfileComponent } from "./components/profile/my-profile/my-profile.component";
import { OtherProfileComponent } from "./components/profile/other-profile/other-profile.component";
import { HrCardComponent } from "./components/home/hr-card/hr-card.component";
import { RmCardComponent } from "./components/home/rm-card/rm-card.component";
import { LeaveCardComponent } from "./components/home/leave-card/leave-card.component";
import { RadialProgressChartComponent } from "./components/home/leave-card/radial-progress-chart/radial-progress-chart.component";
import { D3Service } from "d3-ng2-service";
import { AppsCardComponent } from './components/home/apps-card/apps-card.component';
import { ApplyLeaveComponent } from './components/leave/apply-leave/apply-leave.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CustomerComponent,
    EquipmentComponent,
    ContractComponent,
    AlertComponent,
    CustomerDetailsComponent,
    EquipmentDetailsComponent,
    ContractDetailsComponent,
    ContractFormComponent,
    FindCustomerComponent,
    FindEquipmentComponent,
    CustomerFormComponent,
    BusyDisplayComponent,
    NoRecordsFoundComponent,
    DisableControlDirective,
    ContractApprovalComponent,
    ContractApprovalViewComponent,
    DiffrenceLabelComponent,
    ProfileComponent,
    ProfileViewComponent,
    ProfileElementComponent,
    ProfileFormComponent,
    HasRoleDirective,
    ContractDetailsViewComponent,
    HomeComponent,
    ProfileCardComponent,
    MyProfileComponent,
    OtherProfileComponent,
    HrCardComponent,
    RmCardComponent,
    LeaveCardComponent,
    RadialProgressChartComponent,
    AppsCardComponent,
    ApplyLeaveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatTooltipModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule,
    MatGridListModule,
    MatDividerModule,
    MatRadioModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatSliderModule,
    MatStepperModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    NgbModule,
    KeycloakAngularModule,
    MatSnackBarModule,
  ],
  providers: [
    DatePipe,
    D3Service,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PnsInterInterceptorService,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      deps: [KeycloakService],
      multi: true,
    },
    { provide: ErrorHandler, useClass: PnsErrorService },
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
