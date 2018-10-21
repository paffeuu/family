import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FamilyService} from "../../../../shared/service/family.service";
import {Family} from "../../../../shared/model/family";
import {Father} from "../../../../shared/model/father";
import {Child} from "../../../../shared/model/child";

@Component({
  selector: 'app-show-created-family',
  templateUrl: './show-created-family.component.html',
  styleUrls: ['./show-created-family.component.css']
})
export class ShowCreatedFamilyComponent implements OnInit, AfterViewInit{

  constructor(private familyService: FamilyService) { }
  familyEx1 = new Family();
  familyEx2 = new Family();
  tBody;
  ngOnInit() {
    this.familyEx1.father = new Father("Janusz", "Kowalski", "2342234", new Date());
    this.familyEx1.children = [new Child("Maria", "Kula", "32242", new Date(), "female")];
    this.familyEx2.father = new Father("Mariusz", "Nowak", "2342234", new Date());
    this.familyEx2.children = [new Child("Janina", "Aaaron", "32242", new Date(), "female")];

  }

  ngAfterViewInit() {
    let successAlert = document.getElementById("success");
    successAlert.setAttribute("style", "display: block;");
    setInterval(() => successAlert.setAttribute("style", "display:none;"), 5000);
    this.familyService.getFamilyAsObservable().subscribe(family => {
        if (family) {
        setTimeout(() => this.loadFamilyToTable(family), 100);
      }
    });
  }

  loadFamilyToTable(family: Family):void {
    let table = document.getElementById("family-table") as HTMLTableElement;
    if (this.tBody) {
      table.removeChild(this.tBody);
    }
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
    fatherAttributes[3].appendChild(document.createTextNode(family.father.birthDate.toDateString()));
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
      childAttributes[3].appendChild(document.createTextNode(child.birthDate.toDateString()));
      childAttributes[4].appendChild(document.createTextNode(child.sex));
    })
  }

}
