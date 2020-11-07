import { Component, OnInit, OnDestroy } from "@angular/core";
import { LeaveService } from "src/app/services/leave.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-leave-history",
  templateUrl: "./leave-history.component.html",
  styleUrls: ["./leave-history.component.scss"],
})
export class LeaveHistoryComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  years = [2020, 2019];
  displayedColumns: string[] = [
    "select",
    "type",
    "from",
    "to",
    "noOfDays",
    "dateOfApply",
    "status",
    "note",
  ];

  dataSource = [];
  selectedLeave: any;
  constructor(private service: LeaveService) {}

  ngOnInit(): void {
    this.loadHistory();
    this.subscription = this.service
      .getRefreshSubscriber()
      .subscribe(() => this.loadHistory());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }

  loadHistory() {
    this.service
      .getLeaveHistory()
      .subscribe((res: any) => (this.dataSource = res));
  }
}
