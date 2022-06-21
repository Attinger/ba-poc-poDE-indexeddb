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
    db.collection('Price').get().then((config: any) => {
      if (config.length > 1) {
        let initialPrize = 61001;
        for (let i = 0; i < config.length; i++) {
          if (config[i].selected == true) {
            initialPrize = initialPrize + config[i].price;
          }
        }
        this.setPrice(initialPrize);
      }else {
        const initialPrize = 63500;
        this.setPrice(initialPrize);
      }
    })
  }

  receiveMessage($event, price) {
    this.message = $event
  }

  setPrice(price) {
    const htmlTargetElement = document.querySelector('.price-input');
    htmlTargetElement.innerHTML = `${price} €`;
  }
}
