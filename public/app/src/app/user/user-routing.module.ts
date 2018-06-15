import { RouterModule, Routes } from "@angular/router";

import { UserFormComponent } from "./user-form/user-form.component";
import { UserListComponent } from "./user-list/user-list.component";

import { UserResolver, UserListResolver } from "./user-resolver.service";


const routes: Routes = [
  {
    path     : "",
    component: UserListComponent,
    resolve  : { users: UserListResolver },
  },
  {
    path     : ":id",
    component: UserFormComponent,
    resolve  : { user: UserResolver }
  }
];

export const UserRouting = RouterModule.forChild(routes);
