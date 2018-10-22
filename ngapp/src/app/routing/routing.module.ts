import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WelcomeComponent} from "../component/main-view/welcome/welcome.component";
import {RouterModule} from "@angular/router";
import {AddChildComponent} from "../component/main-view/create-family/add-child/add-child.component";
import {CreateFamilyComponent} from "../component/main-view/create-family/create-family.component";
import {AddFatherComponent} from "../component/main-view/create-family/add-father/add-father.component";
import {ShowCreatedFamilyComponent} from "../component/main-view/create-family/show-created-family/show-created-family.component";
import {SearchFamilyComponent} from "../component/main-view/search-family/search-family.component";
import {SearchByChildComponent} from "../component/main-view/search-family/search-by-child/search-by-child.component";
import {ChooseFamilyComponent} from "../component/main-view/search-family/choose-family/choose-family.component";

const routes = [
  {path: '', component: WelcomeComponent},
  {path: 'create-family', component: CreateFamilyComponent, children: [
      {path: '', component: AddFatherComponent},
      {path: 'add-child', component: AddChildComponent},
      {path: 'family-created', component: ShowCreatedFamilyComponent}
    ]},
  {path: 'search-family', component: SearchFamilyComponent, children: [
      {path: '', component: SearchByChildComponent},
      {path: 'show-family', component: ChooseFamilyComponent},
    ]},
  {path: '**', component: WelcomeComponent}
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
