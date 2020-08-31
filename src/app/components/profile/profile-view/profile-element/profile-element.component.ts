import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-profile-element",
  templateUrl: "./profile-element.component.html",
  styleUrls: ["./profile-element.component.scss"],
})
export class ProfileElementComponent implements OnInit {
  @Input("attribute") attribute;
  @Input("value") value;
  constructor() {}

  ngOnInit(): void {}
}
