import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { SecurityRoutingModule } from "./security-routing.module";

import { LoginComponent } from "./login/login.component";
import { CreateAccountComponent } from "./create-account/create-account.component";
import { CommonModule } from "@angular/common";

import { MrlFormModule } from "../_shared/mrl-forms/mrl-forms.module";


@NgModule({
  imports: [CommonModule, MrlFormModule, SecurityRoutingModule],
  providers: [],
  declarations: [LoginComponent, CreateAccountComponent]
})
export class SecurityModule {}
