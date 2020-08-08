import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

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
import { MatDividerModule } from "@angular/material/divider";
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
import { FindCustomerComponent } from './components/contract/contract-form/find-customer/find-customer.component';
import { FindEquipmentComponent } from './components/contract/contract-form/find-equipment/find-equipment.component';
import { CustomerFormComponent } from './components/customer/customer-form/customer-form.component';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
