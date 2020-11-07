import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { EmployeeProfileModel } from "src/app/models/employee.profile.model";
import { EmployeeProfileService } from "src/app/services/employee-profile.service";

@Component({
  selector: "app-search-profile",
  templateUrl: "./search-profile.component.html",
  styleUrls: ["./search-profile.component.scss"],
})
export class SearchProfileComponent implements OnInit {
  resp: EmployeeProfileModel[] = [];
  isloading = false;
  pageCount = 0;
  searchOption = [
    {
      value: "Search Employee",
      type: "search",
      searchFieldName: "Enter Key for Searching",
      searchButtonName: "Search",
    },
    {
      value: "Find All",
      type: "all",
      searchFieldName: "Keep It Blank",
      searchButtonName: "Find All",
    },
  ];

  selectedOption = this.searchOption[0];
  seachKeyControl = new FormControl(null, [Validators.required]);
  isSearched = false;
  url = "";
  page = 1;
  constructor(private service: EmployeeProfileService) {}

  ngOnInit(): void {}

  isSeachButtonDisabled() {
    return this.selectedOption.type != "all" && !this.seachKeyControl.valid;
  }

  isSeachFieldDisabled() {
    if (this.selectedOption.type == "all") {
      this.seachKeyControl.reset();
      return true;
    }
    return false;
  }

  searchEmployee() {
    let url = "";
    switch (this.selectedOption.type) {
      case "search": {
        url = `${url}/search?query=${this.seachKeyControl.value}`;
        break;
      }
      case "all": {
        url = `${url}/all?`;
        break;
      }
    }
    this.url = url;
    this.changePage(1);
  }

  changePage(pageNo: any) {
    this.getServiceCall(`${this.url}&page=${pageNo}`, pageNo);
  }

  getServiceCall(url: string, pageNo?: number) {
    this.isloading = true;
    this.isSearched = true;
    this.service.search(url).subscribe((res: any) => {
      this.resp = res.result;
      this.pageCount = res.pageCount;
      this.isSearched = true;
      this.page = res.pageCount > 0 ? (pageNo > 0 ? pageNo : 0) : 0;
      this.isloading = false;
    });
  }

  dummyResp(n: number): Array<number> {
    return Array(n);
  }
}
