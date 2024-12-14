import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { AdminEventsComponent } from "./views/admin/adminEvents/adminEvents.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { MembersAdminComponent } from "./views/admin/members/members.component";
import { PubsComponent } from "./views/admin/pubs/pubs.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { MembersComponent } from "./views/members/members.component";
import { EventsComponent } from "./views/events/events.component";
import { PublicationsComponent } from './views/publications/publications.component';
import { ToolsComponent } from "./views/admin/tools/tools.component";
const routes: Routes = [
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "settings", component: SettingsComponent },
      { path: "members", component: MembersAdminComponent },
      { path: "events", component: AdminEventsComponent },
      { path: "publications", component: PubsComponent },
      { path: "tools", component: ToolsComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      // { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  // no layout views
  { path: "members", component: MembersComponent },
  { path: "events", component: EventsComponent },
  { path: "pubs", component: PublicationsComponent },

  { path: "profile", component: ProfileComponent },
  { path: "landing", component: LandingComponent },
  { path: "", component: IndexComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
