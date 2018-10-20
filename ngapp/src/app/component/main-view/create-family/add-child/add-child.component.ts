import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PeselToBirthDateService} from "../../../../shared/service/pesel-to-birth-date.service";

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.css']
})
export class AddChildComponent implements OnInit, AfterViewInit {
  date: string;

  constructor(private peselToBirthDateService: PeselToBirthDateService) { }

  ngOnInit() {
    this.date = "";
  }

  ngAfterViewInit() {
    let peselInput = document.getElementById("pesel-input") as HTMLInputElement;
    peselInput.oninput = () => {
      if (peselInput.value.length == 11) {
        let dateOfBirth:Date = this.peselToBirthDateService.convertPeselToBirthDate(peselInput.value);
        this.date = dateOfBirth.toISOString().substr(0,10);
      }
    };
  }
}
