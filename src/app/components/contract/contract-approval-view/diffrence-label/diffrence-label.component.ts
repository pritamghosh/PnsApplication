import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-diffrence-label",
  templateUrl: "./diffrence-label.component.html",
  styleUrls: ["./diffrence-label.component.scss"],
})
export class DiffrenceLabelComponent implements OnInit {
  @Input("labelName") labelName: string;
  @Input("oldValue") oldValue: string;
  @Input("newValue") newValue: string;
  constructor() {}

  ngOnInit(): void {}

  get value() {
    return this.newValue != null ? this.newValue : this.oldValue;
  }

  get valueClass() {
    if (this.newValue == this.oldValue) {
      return "nc";
    }
    return this.newValue != null ? "new" : "old";
  }

  get details() {
    return "ki likhbo janina";
  }
}
