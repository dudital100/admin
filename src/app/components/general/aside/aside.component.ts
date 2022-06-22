import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  // showFiller = false;
  isOpen = false

  constructor() { }

  ngOnInit(): void {
  }
  toggleOpen() {
    this.isOpen = !this.isOpen
  }
}
