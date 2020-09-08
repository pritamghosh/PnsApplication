import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-apps-card",
  templateUrl: "./apps-card.component.html",
  styleUrls: ["./apps-card.component.scss"],
})
export class AppsCardComponent implements OnInit {
  links = [
    {
      name: "Leaves",
      link: "",
    },
    {
      name: "Expense",
      link: "",
    },
    {
      name: "Payslips",
      link: "",
    },
    {
      name: "Profile",
      link: "myprofile",
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
