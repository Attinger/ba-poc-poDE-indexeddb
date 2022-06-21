import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import {LightComponentModule} from './light.model';
// @ts-ignore
import {db} from 'src/app/app.globals';
import {AccordionChangeEvent} from '@porsche-design-system/components-angular/lib/types';

@Component({
  selector: 'app-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss']
})
export class LightComponent implements OnInit {

  price: number;

  @Output() priceEvent = new EventEmitter<number>();

  constructor() {}

  db = db;
  isAccordion1Open = false;

  lightConfig: LightComponentModule[];

  lightConf = [];

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    const response = await this.getDataFromApi();

    for (let i = 0; i < response.length; i++) {
      const obj = {
        title: response[i].title,
        subtitle: response[i].subtitle,
        price: response[i].price,
        selected: response[i].selected,
        id: response[i].id,
        category:  response[i].category,
      };
      this.lightConf.push(obj);
    }
  }

  async getDataFromApi() {
    const url = 'https://4einhalb.com/wordpress/wp-content/uploads/2022/06/light.json';
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  onAccordion1Change(e: CustomEvent<AccordionChangeEvent>) {
    this.isAccordion1Open = e.detail.open;
  }
}
