import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import {RoutingModule} from "../routing/routing.module";

@NgModule({
  imports: [
    CommonModule,
    RoutingModule
  ],
  exports: [
    MenuComponent
  ],
  declarations: [MenuComponent]
})
export class MenuModule { }
