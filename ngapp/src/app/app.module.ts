import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RoutingModule} from "./routing/routing.module";
import {MenuModule} from "./component/menu/menu.module";
import {CreateFamilyModule} from "./component/main-view/create-family/create-family.module";
import {WelcomeComponent} from "./component/main-view/welcome/welcome.component";


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    MenuModule,
    CreateFamilyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
