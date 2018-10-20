import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit()
  {
    let menuItems = document.getElementsByClassName("menu-item");
    for(let i = 0; i < menuItems.length; i++) {
      let item = menuItems.item(i);
      item.addEventListener("mousemove", () =>
        item.setAttribute("style", "background-color: #303030;"));
      item.addEventListener("mouseout", () =>
        item.setAttribute("style", "background-color: #353535;")
      )
    }
  }

}
