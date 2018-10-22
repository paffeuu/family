import {Component, OnInit} from '@angular/core';
import {FamilyService} from "../../shared/service/family.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private familyService: FamilyService) { }

  ngOnInit() {}

  createFamily(): void {
    this.familyService.initializeFamily();
  }

}
