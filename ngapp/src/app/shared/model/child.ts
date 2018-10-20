export class Child {
  firstName: string;
  secondName: string;
  pesel: string;
  birthDate: Date;
  sex: string;

  constructor(firstName: string, secondName: string, pesel: string, birthDate: Date, sex: string) {
    this.firstName = firstName;
    this.secondName = secondName;
    this.pesel = pesel;
    this.birthDate = birthDate;
    this.sex = sex;
  }
}
