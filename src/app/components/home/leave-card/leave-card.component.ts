import { Component, OnInit } from "@angular/core";
import { LeaveService } from "src/app/services/leave.service";

@Component({
  selector: "app-leave-card",
  templateUrl: "./leave-card.component.html",
  styleUrls: ["./leave-card.component.scss"],
})
export class LeaveCardComponent implements OnInit {
  response = [];

  progessColors = ["indigo", "green", "brown"];
  constructor(private service: LeaveService) {}

  ngOnInit(): void {
    this.service
      .getLeaveQuota()
      .subscribe((res: any) => (this.response = res.details));
  }
}
