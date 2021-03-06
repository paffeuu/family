import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RoutingModule} from "./routing/routing.module";
import {MenuModule} from "./component/menu/menu.module";
import {CreateFamilyModule} from "./component/main-view/create-family/create-family.module";
import {WelcomeComponent} from "./component/main-view/welcome/welcome.component";
import {HttpClientModule} from "@angular/common/http";
import {SearchFamilyModule} from "./component/main-view/search-family/search-family.module";


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    MenuModule,
    CreateFamilyModule,
    SearchFamilyModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
