import { Injectable } from '@angular/core';
import {Family} from "../model/family";
import {Father} from "../model/father";
import {Child} from "../model/child";
import {RestService} from "./rest.service";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  family: Family;
  familySubject: Subject<Family>;

  constructor(private restService: RestService) {
    this.familySubject = new Subject<Family>();
    this.restService.getFamilyAsObservable().subscribe(
      family => this.familySubject.next(family)
    )
  }

  initializeFamily(): void {
    this.family = new Family();
  }

  addFather(firstName: string, secondName: string, pesel: string, birthDate: Date): boolean {
    if (firstName == null || secondName == null || pesel == null || birthDate == null) {
      return false;
    }
    if (firstName.length == 0 || secondName.length == 0 || pesel.length == 0) {
      return false;
    }
    FamilyService.toUpperCase(firstName);
    FamilyService.toUpperCase(secondName);
    this.family.father = new Father(firstName, secondName, pesel, birthDate);
    return true;
  }

  addChild(firstName: string, secondName: string, pesel: string, birthDate: Date, sex: string): boolean {
    if (firstName == null || secondName == null || pesel == null || birthDate == null || sex == null) {
      return false;
    }
    if (firstName.length == 0 || secondName.length == 0 || pesel.length == 0 || sex.length == 0) {
      return false;
    }
    if (sex != "male" && sex != "female") {
      return false;
    }
    FamilyService.toUpperCase(firstName);
    FamilyService.toUpperCase(secondName);
    this.family.children.push(new Child(firstName, secondName, pesel, birthDate, sex));
    return true;
  }

  createFamily(): void {
      this.restService.createFamily(this.family);
  }

  nextFamily(family: Family): void {
    this.familySubject.next(family);
  }

  getFamilyAsObservable(): Observable<Family> {
    return this.familySubject.asObservable();
  }

  static toUpperCase(word: string) {
    return word.charAt(0).toUpperCase() + word.substr(1);
  }
}
