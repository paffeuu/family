import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PeselToBirthDateService} from "../../../../shared/service/pesel-to-birth-date.service";
import {FamilyService} from "../../../../shared/service/family.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-father',
  templateUrl: './add-father.component.html',
  styleUrls: ['./add-father.component.css']
})
export class AddFatherComponent implements OnInit, AfterViewInit {
  date: string;

  firstName: string;
  secondName: string;
  pesel: string;
  birthDate: Date;

  constructor(private peselToBirthDateService: PeselToBirthDateService,
              private familyService: FamilyService, private router: Router) { }

  ngOnInit() {
    this.date = "";
    }

  ngAfterViewInit() {
    (document.getElementById("pesel-input") as HTMLInputElement).oninput = () => this.generateDate();
  }

  addFather(): void {
    this.generateDate();
    if (this.familyService.addFather(this.firstName, this.secondName, this.pesel, this.birthDate)) {
      this.router.navigate(['/create-family/add-child']);
    } else {
      let failedAlert = document.getElementById("failed");
      failedAlert.setAttribute("style", "display: block;");
      setInterval(() => failedAlert.setAttribute("style", "display:none;"), 5000);
    }
  }

  generateDate(): void {
    let peselInput = document.getElementById("pesel-input") as HTMLInputElement;
    if (peselInput.value.length == 11) {
      this.birthDate = this.peselToBirthDateService.convertPeselToBirthDate(peselInput.value);
      if (this.birthDate) {
        this.date = this.birthDate.toISOString().substr(0,10);
      } else {
        this.date = "";
      }
    } else {
      this.birthDate = null;
      this.date = "";
    }
  }

}
