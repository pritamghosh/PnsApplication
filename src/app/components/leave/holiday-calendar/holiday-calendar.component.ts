import { Component, OnInit } from "@angular/core";
import { LeaveService } from "src/app/services/leave.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-holiday-calendar",
  templateUrl: "./holiday-calendar.component.html",
  styleUrls: ["./holiday-calendar.component.scss"],
})
export class HolidayCalendarComponent implements OnInit {
  displayedColumns: string[] = ["date", "day", "occasion"];
  res: any;
  dataSource = [];
  regions = [];
  selectedRegion = new FormControl();
  constructor(private service: LeaveService) {}

  ngOnInit(): void {
    this.service.getHolidayCalendar().subscribe((res: []) => {
      this.res = res;
      this.dataSource = this.res[0].details;
      this.selectedRegion.setValue(0);
      res.forEach((element: any, i) => {
        this.regions.push({ region: element.region, index: i });
      });
    });

    this.selectedRegion.valueChanges.subscribe((e) => {
      this.dataSource = this.res[e].details;
    });
  }
}
