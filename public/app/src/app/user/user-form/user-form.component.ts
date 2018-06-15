import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Account } from "../../../../../../shared/-index";


@Component({
  moduleId    : module.id,
  selector    : "app-user-form",
  templateUrl : "user-form.component.html",
  styleUrls   : ["user-form.component.css"]
})
export class UserFormComponent implements OnInit {

  user: Account;
  
  constructor(private router: Router,
              private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.user = this.route.snapshot.data.user;
    console.log(this.user);
  }

}
