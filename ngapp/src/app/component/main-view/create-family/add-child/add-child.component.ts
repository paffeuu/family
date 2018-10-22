import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PeselToBirthDateService} from "../../../../shared/service/pesel-to-birth-date.service";
import {FamilyService} from "../../../../shared/service/family.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.css']
})
export class AddChildComponent implements OnInit, AfterViewInit {
  date: string;

  firstName: string;
  secondName: string;
  pesel: string;
  birthDate: Date;
  sex: string;

  counter: number;

  constructor(private peselToBirthDateService: PeselToBirthDateService,
              private familyService: FamilyService,
              private router: Router) { }

  ngOnInit() {
    this.counter = 1;
    this.date = "";
    this.sex = "";

  }

  ngAfterViewInit() {
    (document.getElementById("pesel-input") as HTMLInputElement).oninput = () => this.generateDate();
  }

  addChild(): void {
    this.generateDate();
    if (this.familyService.addChild(this.firstName, this.secondName, this.pesel, this.birthDate, this.sex)) {
      let createdAlert = document.getElementById("created");
      createdAlert.setAttribute("style", "display: block;");
      setTimeout(() => createdAlert.setAttribute("style", "display:none;"), 5000);
      this.refreshComponent();
    } else {
      let failedAlert = document.getElementById("failed");
      failedAlert.setAttribute("style", "display: block;");
      setTimeout(() => failedAlert.setAttribute("style", "display:none;"), 5000);
    }
  }

  createFamily(): void {
    this.familyService.createFamily();
    this.router.navigate(['/create-family/family-created']);
  }

  generateDate(): void {
    let peselInput = document.getElementById("pesel-input") as HTMLInputElement;
    if (peselInput.value.length == 11) {
      this.birthDate = this.peselToBirthDateService.convertPeselToBirthDate(peselInput.value);
      if (this.birthDate) {
        this.date = this.birthDate.toISOString().substr(0, 10);
      } else {
        this.date = "";
      }
    } else {
      this.birthDate = null;
      this.date = "";
    }
  }

  refreshComponent(): void {
    this.firstName = "";
    this.secondName = "";
    this.pesel = "";
    this.birthDate = null;
    this.date = "";
    this.sex = "";
    this.counter++;
  }
}
