import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { CustomerModel } from "src/app/models/customer.model";

@Component({
  selector: "app-customer-form",
  templateUrl: "./customer-form.component.html",
  styleUrls: ["./customer-form.component.scss"],
})
export class CustomerFormComponent implements OnInit {
  constructor() {}
  @Input("customer") customer: CustomerModel;
  @Output("action") submitEmitter: EventEmitter<
    CustomerModel
  > = new EventEmitter();
  @Output("secondAction") secondActionEmitter = new EventEmitter();
  submitButtonName: string;
  secondButtonName: string;
  secondButtonColor: string;
  customerForm: FormGroup;
  title: string;
  ngOnInit(): void {
    this.customerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      region: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      pan: new FormControl(null, [Validators.required]),
      gstinNo: new FormControl(null, [Validators.required]),
      _id: new FormControl(null),
    });
    this.init();
  }

  init() {
    if (this.customer == undefined) {
      this.secondButtonName = "Reset";
      this.submitButtonName = "Add";
      this.secondButtonColor = "accent";
      this.title = "Enter Customer Details";
    } else {
      this.secondButtonName = "Cancel";
      this.submitButtonName = "Update";
      this.secondButtonColor = "warn";
      this.title = "Update Customer Details";
      this.customerForm.patchValue(this.customer);
    }
  }
  submitAction() {
    this.submitEmitter.emit(this.customerForm.value);
  }
  secondButtonAction() {
    this.secondActionEmitter.emit(this.customerForm);
  }
}
