import { Component, OnInit } from '@angular/core';
import {FamilyService} from "../../../../shared/service/family.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-by-child',
  templateUrl: './search-by-child.component.html',
  styleUrls: ['./search-by-child.component.css']
})
export class SearchByChildComponent implements OnInit {
  firstName: string;
  secondName: string;
  pesel: string;
  birthDate: Date;
  sex: string;

  constructor(private familyService: FamilyService, private router: Router) { }

  ngOnInit() {
  }

  searchForFamily(): void {
    if (this.familyService.searchChild(this.firstName, this.secondName, this.pesel, this.birthDate, this.sex)) {
      this.router.navigate(['/search-family/show-family']);
    } else {
      let failedAlert = document.getElementById("failed");
      failedAlert.setAttribute("style", "display: block;");
      setTimeout(() => failedAlert.setAttribute("style", "display:none;"), 5000);
    }
  }

}
