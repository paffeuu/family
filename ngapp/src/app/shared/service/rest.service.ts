import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Family} from "../model/family";
import {Subject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Father} from '../model/father';

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

  constructor(private http: HttpClient) {
    this.familyIdSubject = new Subject();
    this.fatherIdSubject = new Subject();
    this.childIdSubject = new Subject();
    this.childCounter = 0;
    this.familySubject = new Subject();
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
    )
    this.fatherIdSubject.asObservable().subscribe(
      (fatherId) => {
        if (fatherId != -1) {
          this.addChildren();
        } else {
          this.familySubject.next(null);
        }
      }
    )

    this.childIdSubject.asObservable().subscribe(
      (childId) => {
        if (childId != -1) {
          if (++this.childCounter == this.family.children.length) {
            this.familySubject.next(this.family);
            this.cleanupData();
          }
        } else {
          this.familySubject.next(null);
        }
      }
    )
  }

  cleanupData(): void {

  }

  createFamily(family: Family): void {
    this.family = family;
    this.http.post(environment.url + environment.createFamilyEndpoint, null).subscribe(
      (response) => this.familyIdSubject.next(response as number),
      (error) => this.familyIdSubject.next(-1)
    );
  }

  addFather() {
    this.http.post(environment.url + environment.addFatherEndpoint + this.familyId, this.family.father).subscribe(
      (response) => this.fatherIdSubject.next(response as number),
      (error) => this.fatherIdSubject.next(-1)
    )
  }

  addChildren() {
    for (let i = 0; i < this.family.children.length; i++) {
      this.http.post(environment.url + environment.addChildEndpoint + this.familyId, this.family.children[i]).subscribe(
        (response) => this.childIdSubject.next(response as number),
        (error) => this.childIdSubject.next(-1)
      )
    }
  }
  getFamilyAsObservable(): Observable<any> {
    return this.familySubject.asObservable();
  }
}
