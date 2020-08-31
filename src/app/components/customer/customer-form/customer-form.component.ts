import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";
import { FormGroup, Validators, FormControl, NgForm } from "@angular/forms";
import { CustomerModel } from "src/app/models/customer.model";

@Component({
  selector: "app-customer-form",
  templateUrl: "./customer-form.component.html",
  styleUrls: ["./customer-form.component.scss"],
})
export class CustomerFormComponent implements OnInit {
  constructor() {}

  @ViewChild("form") fromElement: NgForm;
  @Input("customer") customer: CustomerModel;
  @Output("action") submitEmitter = new EventEmitter();
  @Output("secondAction") secondActionEmitter = new EventEmitter();
  submitButtonName: string;
  secondButtonName: string;
  secondButtonColor: string;
  customerForm: FormGroup;
  isCreate = true;
  title: string;
  ngOnInit(): void {
    this.customerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      region: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      pan: new FormControl(null, [
        Validators.pattern("^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$"),
      ]),
      gstinNo: new FormControl(null, [
        Validators.pattern(
          "^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[a-zA-Z1-9]{1}[zZ]{1}[0-9A-Za-z]$"
        ),
      ]),
      _id: new FormControl(null),
    });
    this.init();
  }

  init() {
    if (this.customer == undefined) {
      this.secondButtonName = "Reset";
      this.submitButtonName = "Add";
      this.secondButtonColor = "warn";
      this.title = "Enter Customer Details";
    } else {
      this.isCreate = false;
      this.secondButtonName = "Cancel";
      this.submitButtonName = "Update";
      this.secondButtonColor = "warn";
      this.title = "Update Customer Details";
      this.customerForm.patchValue(this.customer);
    }
  }
  submitAction() {
    this.submitEmitter.emit({
      customer: this.customerForm.value,
      form: this.fromElement,
    });
  }
  secondButtonAction() {
    this.secondActionEmitter.emit(this.customerForm);
  }

  get secondButtonDisable() {
    return this.isCreate && this.customerForm.untouched;
  }
}
