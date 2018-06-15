import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

import { MdlSnackbarService } from "@angular-mdl/core";

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
  
  isProcessing: boolean = false;
  
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
              private mdlSnackbarService: MdlSnackbarService,
              private userService: UserService,
              private errorHandlerService: ErrorHandlerService) { }
  
  ngOnInit() {
    this.userId = this.route.snapshot.params.id;
    this.users  = this.route.snapshot.data.users;
    
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
  
    if (this.userId) this.initializeFormValues();
  }
  
  initializeFormValues(): void {
    this.user   = this.route.snapshot.data.user[0];
    
    this.form.patchValue({
      "firstName"    : this.user.firstName,
      "lastName"     : this.user.lastName,
      "emailAddress" : this.user.emailAddress,
      "age"          : this.user.age,
      "birthday"     : this.user.birthday,
      "gender"       : this.user.gender
    });
  }
  
  checkFieldValueValidity(fieldName: string, field: FormControl, isUniqueRequired: boolean = false): void {
    this.errorHandlerService.checkFieldValueValidity(fieldName, field, this.users, isUniqueRequired);
  }
  
  save(user: Account): void {
    this.isProcessing = true;
    
    const action = this.userId ? "update" : "add";
    const save   = this.userId ? this.userService.updateUser(this.userId, user) : this.userService.addNewUser(user);
    
    save.subscribe(response => this.showSnackbar(action));
  }
  
  showSnackbar(action: string): void {
    const message = action === "add" ? "Successfully Added User" : "Successfully Updated";
    
    this.mdlSnackbarService.showSnackbar({
      message           : message,
      timeout           : 1000,
      closeAfterTimeout : true,
      action            : {
        handler: () => {},
        text: 'X'
      }
    })
    .subscribe(() => {
      this.isProcessing = false;
      setTimeout(() => this.router.navigate(["../"]), 500);
    });
  }

}
