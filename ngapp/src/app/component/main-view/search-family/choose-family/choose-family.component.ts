import { Component, OnInit } from '@angular/core';
import {Father} from "../../../../shared/model/father";
import {FamilyService} from "../../../../shared/service/family.service";
import {Family} from "../../../../shared/model/family";

@Component({
  selector: 'app-choose-family',
  templateUrl: './choose-family.component.html',
  styleUrls: ['./choose-family.component.css']
})
export class ChooseFamilyComponent implements OnInit {
  tBody;
  selectedFather: Father;
  selectedRow: HTMLElement;

  constructor(private familyService: FamilyService) { }

  ngOnInit() {
    this.familyService.getFamiliesAsObservable().subscribe(
      families => {
        if (families) {
          let fathers = new Set<Father>();
          families.forEach(family => {
            if (family) {
              fathers.add(family.father)
            }
          });
          console.log(fathers);
          this.loadFathersToTable(fathers);
        } else {
          let serverErrorAlert = document.getElementById("server-error");
          serverErrorAlert.setAttribute("style", "display: block;");
          console.log(serverErrorAlert);
          setTimeout(() => serverErrorAlert.setAttribute("style", "display:none;"), 5000);
        }
      }
    );
  }

  loadFathersToTable(fathers: Set<Father>):void {
    let table = document.getElementById("family-table") as HTMLTableElement;
    this.clearTable();
    let tbody = document.createElement("tbody");
    this.tBody = tbody;
    table.appendChild(tbody);
    fathers.forEach(father => {
      let fatherRow = document.createElement("tr");
      fatherRow.addEventListener("click", () => {
        if (this.selectedRow) {
          this.selectedRow.style.backgroundColor = null;
        }
        this.selectedRow = fatherRow;
        this.selectedRow.style.backgroundColor = "#a81a34";
        this.selectedFather = father;
      });
      tbody.appendChild(fatherRow);
      let fatherRole = document.createElement("th");
      fatherRow.appendChild(fatherRole);
      fatherRole.appendChild(document.createTextNode("Father"));
      let fatherAttributes = [];
      for (let i = 0; i < 4; i++) {
        fatherAttributes.push(document.createElement("td"));
        fatherRow.appendChild(fatherAttributes[i]);
      }
      fatherAttributes[0].appendChild(document.createTextNode(father.firstName));
      fatherAttributes[1].appendChild(document.createTextNode(father.secondName));
      fatherAttributes[2].appendChild(document.createTextNode(father.pesel));
      fatherAttributes[3].appendChild(document.createTextNode(father.birthDate));
    });
    console.log(table);
  }

  loadFamilyToTable(family: Family):void {
    this.clearTable();
    let table = document.getElementById("family-table") as HTMLTableElement;
    let tbody = document.createElement("tbody");
    this.tBody = tbody;
    table.appendChild(tbody);
    let fatherRow = document.createElement("tr");
    tbody.appendChild(fatherRow);
    let fatherRole = document.createElement("th");
    fatherRow.appendChild(fatherRole);
    fatherRole.appendChild(document.createTextNode("Father"));
    let fatherAttributes = [];
    for (let i = 0; i < 4; i++) {
      fatherAttributes.push(document.createElement("td"));
      fatherRow.appendChild(fatherAttributes[i]);
    }
    fatherAttributes[0].appendChild(document.createTextNode(family.father.firstName));
    fatherAttributes[1].appendChild(document.createTextNode(family.father.secondName));
    fatherAttributes[2].appendChild(document.createTextNode(family.father.pesel));
    fatherAttributes[3].appendChild(document.createTextNode(family.father.birthDate));
    family.children.forEach(child => {
      let childRow = document.createElement("tr");
      tbody.appendChild(childRow);
      let childRole = document.createElement("th");
      childRow.appendChild(childRole);
      childRole.appendChild(document.createTextNode("Child"));
      let childAttributes = [];
      for (let i = 0; i < 5; i++) {
        childAttributes.push(document.createElement("td"));
        childRow.appendChild(childAttributes[i]);
      }
      childAttributes[0].appendChild(document.createTextNode(child.firstName));
      childAttributes[1].appendChild(document.createTextNode(child.secondName));
      childAttributes[2].appendChild(document.createTextNode(child.pesel));
      childAttributes[3].appendChild(document.createTextNode(child.birthDate));
      childAttributes[4].appendChild(document.createTextNode(child.sex));
    })
  }

  clearTable(): void {
    let table = document.getElementById("family-table") as HTMLTableElement;
    if (this.tBody) {
      table.removeChild(this.tBody);
    }
  }

  showDetails(): void {
    if (this.selectedFather) {
      let family = this.familyService.getFamilyByFather(this.selectedFather);
      this.loadFamilyToTable(family);
    }
  }

}
