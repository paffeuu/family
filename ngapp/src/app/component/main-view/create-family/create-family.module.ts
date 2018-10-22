import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFatherComponent } from './add-father/add-father.component';
import { AddChildComponent } from './add-child/add-child.component';
import {RoutingModule} from "../../../routing/routing.module";
import { CreateFamilyComponent } from './create-family.component';
import { ShowCreatedFamilyComponent } from './show-created-family/show-created-family.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    RoutingModule,
    FormsModule
  ],
  declarations: [
    AddFatherComponent,
    AddChildComponent,
    CreateFamilyComponent,
    ShowCreatedFamilyComponent
  ]
})
export class CreateFamilyModule {}
