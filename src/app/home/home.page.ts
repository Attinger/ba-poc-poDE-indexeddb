import {Component, ViewContainerRef, ComponentFactoryResolver, OnInit} from '@angular/core';
// @ts-ignore
import {db} from 'src/app/app.globals';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private vcr: ViewContainerRef, private cfr: ComponentFactoryResolver) {}

  db = db;


  price: number;
  initialPrice: number;
  message: string;

  async ngOnInit() {
    this.receivePrice()
  }

  receivePrice() {
  }

  receiveMessage($event, price) {
    this.message = $event
  }
  
}
