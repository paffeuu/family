import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WelcomeComponent} from "../main-view/welcome/welcome.component";
import {RouterModule} from "@angular/router";

const routes = [
  {path: '', component: WelcomeComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
