import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { MdlDialogService } from "@angular-mdl/core";
import { MdlSnackbarService } from "@angular-mdl/core";

import { UserService } from "../user.service";

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
              private route: ActivatedRoute,
              private mdlDialogService: MdlDialogService,
              private mdlSnackbarService: MdlSnackbarService,
              private userService: UserService) { }

  ngOnInit() {
    this.users = this.route.snapshot.data.users;
  }
  
  deleteUser(id: string, firstName: string, lastName: string): void {
    this.mdlDialogService
    .confirm(`Are you sure you want to delete ${name}`, "No", "Yes")
    .subscribe(() => {
      this.userService
      .deleteUser(id)
      .subscribe(response => {
        const index: number = this.users.findIndex(users => users.id === id);
        this.users.splice(index, 1);
  
        this.mdlSnackbarService.showSnackbar({ message: `Successfully Deleted ${firstName} ${lastName}` });
      });
    },
    () => {});
  }
  
}
