import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {RoutingModule} from "./routing/routing.module";
import {MenuModule} from "./menu/menu.module";
import {MainViewModule} from "./main-view/main-view.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    MenuModule,
    MainViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
