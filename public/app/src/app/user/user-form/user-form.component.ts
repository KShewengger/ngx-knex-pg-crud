import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import { Gender } from "../../../../../../shared/enums/-index";
import { Account } from "../../../../../../shared/-index";

import { UserService } from "../user.service";
import { ErrorHandlerService } from "../../shared/error-handler.service";


@Component({
  moduleId    : module.id,
  selector    : "app-user-form",
  templateUrl : "user-form.component.html",
  styleUrls   : ["user-form.component.css"]
})
export class UserFormComponent implements OnInit {
  
  form: FormGroup;
  
  genderSelection = ["Male", "Female"];
  Gender: typeof Gender = Gender;
  
  user: Account;
  users: Account[] = [];
  userId: string;
  
  isSuccessful: boolean = false;
  
  firstName     = new FormControl("", [ Validators.required, Validators.pattern("([a-zA-Z ])+") ]);
  lastName      = new FormControl("", [ Validators.required, Validators.pattern("([a-zA-Z ])+") ]);
  age           = new FormControl("", [ Validators.required, Validators.pattern("[0-9]+") ]);
  birthday      = new FormControl("", [ Validators.required ]);
  gender        = new FormControl("", [ Validators.required ]);
  emailAddress  = new FormControl("", [
    Validators.required,
    Validators.pattern("[a-zA-Z0-9.\._-]{1,}.(\\+(.*))?@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")
  ]);
  
  constructor(private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private userService: UserService,
              private errorHandlerService: ErrorHandlerService) { }
  
  ngOnInit() {
    const snapshot = this.route.snapshot.data;
  
    this.userId = this.route.params["id"];
    this.user   = snapshot.user;
    this.users  = snapshot.users;
    
    this.buildForm();
  }
  
  buildForm(): void {
    this.form = this.fb.group({
      "firstName"    : this.firstName,
      "lastName"     : this.lastName,
      "emailAddress" : this.emailAddress,
      "age"          : this.age,
      "birthday"     : this.birthday,
      "gender"       : this.gender
    });
  
    if (this.userId) this.initializeFormValues(this.user);
  }
  
  initializeFormValues(user: Account): void {
    this.form.patchValue({
      "firstName"    : user.firstName,
      "lastName"     : user.lastName,
      "emailAddress" : user.emailAddress,
      "age"          : user.age,
      "birthday"     : user.birthday,
      "gender"       : user.gender
    });
  }
  
  checkFieldValueValidity(fieldName: string, field: FormControl, isUniqueRequired: boolean = false): void {
    this.errorHandlerService.checkFieldValueValidity(fieldName, field, this.users, isUniqueRequired);
  }
  
  save(user: Account): void {
  
  }

}
