import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
  { path: "", redirectTo: "user", pathMatch: "full" },
  { path: "user",  loadChildren: "./user/user.module#UserModule" }
];

export const AppRouting = RouterModule.forRoot(routes, { useHash: false });
