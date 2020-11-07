import { Component, OnInit, OnDestroy } from "@angular/core";
import { LeaveService } from "src/app/services/leave.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-leave-quota",
  templateUrl: "./leave-quota.component.html",
  styleUrls: ["./leave-quota.component.scss"],
})
export class LeaveQuotaComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  displayedColumns: string[] = [
    "type",
    "deductableFrom",
    "deductableTo",
    "entitlement",
    "used",
    "approvalPending",
    "remainder",
  ];

  dataSource = [];
  constructor(private service: LeaveService) {}

  ngOnInit(): void {
    this.loadQuota();
    this.service.getRefreshSubscriber().subscribe(() => this.loadQuota());
  }

  loadQuota() {
    this.service
      .getLeaveQuota()
      .subscribe((res: any) => (this.dataSource = res.details));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }
}
