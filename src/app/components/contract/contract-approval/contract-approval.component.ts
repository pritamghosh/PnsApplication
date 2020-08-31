import {
  Component,
  OnInit,
  AfterViewInit,
  Output,
  EventEmitter,
} from "@angular/core";
import { ContractService } from "src/app/services/contract.service";

@Component({
  selector: "app-contract-approval",
  templateUrl: "./contract-approval.component.html",
  styleUrls: ["./contract-approval.component.scss"],
})
export class ContractApprovalComponent implements OnInit, AfterViewInit {
  @Output("edit") editEmitter = new EventEmitter();
  url = "/approve";
  page = 1;
  contractResp: any[];
  pageCount = 0;
  constructor(private service: ContractService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.changePage(1);
  }

  changePage(pageNo: any) {
    this.search(`${this.url}?page=${pageNo}`, pageNo);
  }

  search(url: string, pageNo?: number) {
    this.service.get(url, true).subscribe((res: any) => {
      this.contractResp = res.result;
      this.pageCount = res.pageCount;
      this.page = res.pageCount > 0 ? (pageNo > 0 ? pageNo : 0) : 0;
    });
  }

  onRemove(event: any) {
    if (this.page < this.pageCount || this.contractResp.length != 1) {
      this.changePage(this.page);
    } else if (this.page > 1) {
      this.changePage(this.page - 1);
    } else {
      this.contractResp = [];
      this.pageCount = 0;
      this.page = 0;
    }
  }
}
