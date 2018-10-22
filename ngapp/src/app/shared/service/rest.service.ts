import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Family} from "../model/family";
import {Subject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Child} from "../model/child";

@Injectable({
  providedIn: 'root'
})
export class RestService {
  family: Family;
  familyId: number;

  familyIdSubject: Subject<number>;
  fatherIdSubject: Subject<number>;
  childIdSubject: Subject<number>;
  childCounter: number;
  familySubject: Subject<any>;

  familiesSubject: Subject<any>;

  constructor(private http: HttpClient) {
    this.familyIdSubject = new Subject();
    this.fatherIdSubject = new Subject();
    this.childIdSubject = new Subject();
    this.childCounter = 0;
    this.familySubject = new Subject();
    this.familiesSubject = new Subject();
    this.initializeSubscriptions();
  }

  initializeSubscriptions(): void {
    this.familyIdSubject.asObservable().subscribe(
      (familyId) => {
        if (familyId != -1) {
          this.familyId = familyId;
          this.addFather();
        } else {
          this.familySubject.next(null);
        }
      }
    );
    this.fatherIdSubject.asObservable().subscribe(
      (fatherId) => {
        if (fatherId != -1) {
          this.addChildren();
        } else {
          this.familySubject.next(null);
        }
      }
    );

    this.childIdSubject.asObservable().subscribe(
      (childId) => {
        if (childId != -1) {
          if (++this.childCounter == this.family.children.length) {
            this.readFamily();
          }
        } else {
          this.familySubject.next(null);
        }
      }
    )
  }

  cleanupData(): void {
    this.childCounter = 0;
    this.family = null;
    this.familyId = -1;
  }

  createFamily(family: Family): void {
    this.family = family;
    this.http.post(environment.url + environment.createFamilyEndpoint, null).subscribe(
      (response) => this.familyIdSubject.next(response as number),
      () => this.familyIdSubject.next(-1)
    );
  }

  addFather() {
    this.http.post(environment.url + environment.addFatherEndpoint + this.familyId, this.family.father).subscribe(
      (response) => this.fatherIdSubject.next(response as number),
      () => this.fatherIdSubject.next(-1)
    )
  }

  addChildren() {
    for (let i = 0; i < this.family.children.length; i++) {
      this.http.post(environment.url + environment.addChildEndpoint + this.familyId, this.family.children[i]).subscribe(
        (response) => this.childIdSubject.next(response as number),
        () => this.childIdSubject.next(-1)
      )
    }
  }

  readFamily() {
    this.http.get(environment.url + environment.readFamilyEndpoint + this.familyId).subscribe(
      (family) => {
        this.familySubject.next(family);
      }, () => this.familySubject.next(null)
    );
    this.cleanupData();
  }

  searchChild(child: Child): void {
    let json = "";
    if (child.firstName) {
      json += JSON.stringify({firstName: child.firstName});
    }
    if (child.secondName) {
      if (json != "") {
        json += ",";
      }
      json += JSON.stringify({secondName: child.secondName});
    }
    if (child.pesel) {
      if (json != "") {
        json += ",";
      }
      json += JSON.stringify({pesel: child.pesel});
    }
    if (child.birthDate) {
      if (json != "") {
        json += ",";
      }
      json += JSON.stringify({birthDate: child.birthDate});
    }
    if (child.sex) {
      if (json != "") {
        json += ",";
      }
      json += JSON.stringify({sex: child.sex});
    }
    json = json.replace(/{/g,'');
    json = json.replace(/}/g, '');
    json = "{" + json;
    json = json + "}";
    this.http.get(environment.url + environment.searchChildEndpoint, {
      params: JSON.parse(json)
    }).subscribe(
      (families) => this.familiesSubject.next(families),
      () => this.familiesSubject.next(null)
    );
  }


  getFamilyAsObservable(): Observable<any> {
    return this.familySubject.asObservable();
  }

  getFamiliesAsObservable(): Observable<any> {
    return this.familiesSubject.asObservable();
  }
}
