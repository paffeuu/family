import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Family} from "../model/family";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  createFamily(family: Family): Family {
      return family;
  }
}
