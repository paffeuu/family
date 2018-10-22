import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeselToBirthDateService {

  constructor() { }

  convertPeselToBirthDate(pesel: string):Date {
    let year = parseInt(pesel.substring(0,2),10);
    let month = parseInt(pesel.substring(2,4),10) - 1;
    let day = parseInt(pesel.substring(4,6),10);
    if (day > 31) {
      return null;
    }
    if(month>80) {
      year = year + 1800;
      month = month - 80;
    }
    else if (month > 20) {
      year = year + 2000;
      month = month - 20;
    }
    else if (month >= 0 && month <= 11)
    {
      year += 1900;
    } else {
      return null;
    }
    let birthDate = new Date();
    birthDate.setFullYear(year, month, day);
    return birthDate;
  }
}
