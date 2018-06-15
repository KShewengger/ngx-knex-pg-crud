import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { Account } from "../../../../../../shared/-index";


@Component({
  moduleId    : module.id,
  selector    : "app-user-list",
  templateUrl : "user-list.component.html",
  styleUrls   : ["user-list.component.css"]
})
export class UserListComponent implements OnInit {

  users: Account[] = [];
  
  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.users = this.route.snapshot.data.users;
  }

}
