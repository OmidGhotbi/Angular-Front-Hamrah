import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AppService } from "../services/app.service";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent implements OnInit {
  addressForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    mobile: null,
    email: [null, Validators.required],
    reason: [null, Validators.required],
    country: [null, Validators.required],
    city: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appService: AppService
  ) {}

  private submitted = false;
  private firstName = new FormControl("");
  private lastName = new FormControl("");
  private mobile = new FormControl("");
  private email = new FormControl("");
  private reason = new FormControl("");
  private country = new FormControl("");
  private city = new FormControl("");

  ngOnInit() {
    // this.appService.get().subscribe((data) => {
    //   console.log(data);
    // });
  }

  onSubmit() {
    this.submitted = true;

    const form = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      mobile: this.mobile.value,
      email: this.email.value,
      reason: this.reason.value,
      country: this.country.value,
      city: this.city.value,
      timestamp: new Date().toString(),
    };

    this.appService.post(form).subscribe((data) => {
      // console.log(data);
    });

  }
}
