import { Component, OnInit } from '@angular/core';
import {FamilyService} from "../../../../shared/service/family.service";

@Component({
  selector: 'app-show-created-family',
  templateUrl: './show-created-family.component.html',
  styleUrls: ['./show-created-family.component.css']
})
export class ShowCreatedFamilyComponent implements OnInit {

  constructor(private familyService: FamilyService) { }

  ngOnInit() {
    console.log(this.familyService.family);
  }

}
