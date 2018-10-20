export class Father {
  firstName: string;
  secondName: string;
  pesel: string;
  birthDate: Date;

  constructor(firstName: string, secondName: string, pesel: string, birthDate: Date) {
    this.firstName = firstName;
    this.secondName = secondName;
    this.pesel = pesel;
    this.birthDate = birthDate;
  }
}
