import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-profile-element",
  templateUrl: "./profile-element.component.html",
  styleUrls: ["./profile-element.component.scss"],
})
export class ProfileElementComponent implements OnInit {
  @Input("attribute") attribute;
  @Input("value") value;
  @Input("link") link = false;
  @Output("action") action = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
}
