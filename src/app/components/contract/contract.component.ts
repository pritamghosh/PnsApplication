import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ContractService } from "src/app/services/contract.service";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ContractModel } from "src/app/models/contract.model ";
import { ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";
import { RoleService } from "src/app/services/role.service";
import { environment } from "src/environments/environment";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DomainDialogComponent } from "./domain-dialog/domain-dialog.component";
import { DomainService } from "src/app/services/domain.service";

@Component({
  selector: "app-contract",
  templateUrl: "./contract.component.html",
  styleUrls: ["./contract.component.scss"],
})
export class ContractComponent implements OnInit {
  selectedTab = 0;
  contractToEdit: ContractModel;
  contractToRenew: ContractModel;
  isSearched = false;
  pageCount = 0;
  url = "";
  pendingUrl = "/approve";
  page = 1;
  contractResp: ContractModel[];

  pendingContract: [];

  seachKeyControl = new FormControl(null, [Validators.required]);
  startDate = new FormControl(null, [Validators.required]);
  endDate = new FormControl(null, [Validators.required]);
  searchOption = environment.contractSearchOption;

  currentDomain = "";

  selectedOption = this.searchOption[0];
  constructor(
    private service: ContractService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    public role: RoleService,
    public domainService: DomainService,
    public dialog: MatDialog
  ) {
    this.currentDomain = this.domainService.getCurrentDomain();

    if (this.currentDomain == "") {
      this.changeDomain();
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params["customerId"]) {
        this.url = `/customer/${params["customerId"]}?`;
        this.changePage(1);
      } else if (params["equipmentId"]) {
        this.url = `/equipment/${params["equipmentId"]}?`;
        this.changePage(1);
      }
    });
  }

  get minSearchDate() {
    return this.startDate.value;
  }
  isSeachButtonDisabled() {
    if (this.selectedOption.type == "all") {
      return false;
    }
    if (
      this.selectedOption.type == "byAmcDateRange" ||
      this.selectedOption.type == "byCreationDateRange"
    ) {
      return !(this.endDate.valid && this.startDate.valid);
    }
    return !this.seachKeyControl.valid;
  }

  isSeachFieldDisabled() {
    if (this.selectedOption.type == "all") {
      this.seachKeyControl.reset();
      return true;
    }
    return false;
  }

  findContract() {
    let url = "";
    switch (this.selectedOption.type) {
      case "byCreationDateRange": {
        url = `${url}?form=${this.datePipe.transform(
          this.startDate.value,
          "yyyy-MM-dd"
        )}&to=${this.datePipe.transform(
          this.endDate.value,
          "yyyy-MM-dd"
        )}&create=true`;
        break;
      }
      case "byAmcDateRange": {
        url = `${url}?form=${this.datePipe.transform(
          this.startDate.value,
          "yyyy-MM-dd"
        )}&to=${this.datePipe.transform(this.endDate.value, "yyyy-MM-dd")}`;
        break;
      }
      case "byProposalNo": {
        url = `${url}?proposalNo=${this.seachKeyControl.value}`;
        break;
      }
      case "search": {
        url = `${url}/search?query=${this.seachKeyControl.value}`;
        break;
      }
      case "all": {
        url = `${url}?`;
        break;
      }
    }
    this.url = url;
    this.changePage(1);
  }

  search(url: string, pageNo?: number) {
    this.service.get(url).subscribe((res: any) => {
      this.contractResp = res.result;
      this.isSearched = true;
      this.pageCount = res.pageCount;
      this.page = res.pageCount > 0 ? (pageNo > 0 ? pageNo : 0) : 0;
    });
  }

  changePage(pageNo: any) {
    this.search(`${this.url}&page=${pageNo}`, pageNo);
  }

  add(event: any) {
    this.service.add(event.contract, false).subscribe((val) => {
      event.form.reset();
      event.formGroup.patchValue({ amcTax: environment.tax });
    });
  }

  onRenew(event: any) {
    this.service
      .add(event.contract, true)
      .subscribe((res) => this.cancelRenew());
  }

  edit(contract: ContractModel) {
    this.contractToEdit = contract;
    this.selectedTab = 3;
  }

  renew(contract: ContractModel) {
    this.contractToRenew = contract;
    this.selectedTab = 4;
  }

  cancelUpdate() {
    this.contractToEdit = null;
    this.selectedTab = 0;
  }

  cancelRenew() {
    this.contractToRenew = null;
    this.selectedTab = 0;
  }

  reset(event: any) {
    event.form.reset();
    event.formGroup.patchValue({ amcTax: environment.tax });
  }

  update(event: any) {
    this.service.update(event.contract).subscribe((resp: ContractModel) => {
      this.contractResp.forEach((element: ContractModel) => {
        if (element._id == resp._id) {
          element.customer = resp.customer;
          element.equipmentItem = resp.equipmentItem;
          element.amcBasicAmount = resp.amcBasicAmount;
          element.amcTotalAmount = resp.amcTotalAmount;
          element.amcTax = resp.amcTax;
          element.amcTaxAmount = resp.amcTaxAmount;
          element.billingCycle = resp.billingCycle;
          element.amcStartDate = resp.amcStartDate;
          element.amcEndDate = resp.amcEndDate;
          element.note = resp.note;
          element.poFileContent = resp.poFileContent;
          element.poFileContentType = resp.poFileContentType;
          element.poFileName = resp.poFileName;
          element.status = resp.status;
        }
      });
      this.cancelUpdate();
    });
  }

  onDelete(contract: ContractModel) {
    this.service.delete(contract._id).subscribe((c) => {
      if (this.page < this.pageCount || this.contractResp.length != 1) {
        this.changePage(this.page);
      } else if (this.page > 1) {
        this.changePage(this.page - 1);
      } else {
        this.contractResp = [];
        this.pageCount = 0;
        this.page = 0;
      }
    });
  }

  changeDomain() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      isDomainChanged: false,
      currentDomain: this.currentDomain,
    };
    const dialogRef = this.dialog.open(DomainDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (!dialogConfig.data.cancelled) {
        this.currentDomain = dialogConfig.data.currentDomain;
        this.domainService.setCurrentDomain(this.currentDomain);

        if (this.isSearched && dialogConfig.data.isDomainChanged) {
          this.changePage(1);
        }
      }
    });
  }
}
