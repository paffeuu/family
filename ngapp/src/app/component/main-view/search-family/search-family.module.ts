import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchByChildComponent } from './search-by-child/search-by-child.component';
import { SearchFamilyComponent } from './search-family.component';
import {FormsModule} from "@angular/forms";
import {RoutingModule} from "../../../routing/routing.module";
import {ChooseFamilyComponent} from "./choose-family/choose-family.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RoutingModule
  ],
  declarations: [
    SearchFamilyComponent,
    SearchByChildComponent,
    ChooseFamilyComponent
    ]
})
export class SearchFamilyModule { }
