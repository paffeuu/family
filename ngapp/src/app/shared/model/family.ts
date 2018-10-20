import {Child} from "./child";
import {Father} from "./father";

export class Family {
  father: Father;
  children: Child[];

  constructor() {
    this.children = [];
  }
}
