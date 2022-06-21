import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import {MultiselectComponentModule} from './multiselect.model';

// @ts-ignore
import {db} from 'src/app/app.globals';
import {AccordionChangeEvent} from '@porsche-design-system/components-angular/lib/types';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent implements OnInit {

  constructor() {}
  db = db;
  isAccordion1Open = false;
  hiddenContent = [];

  price: number;

  @Output() priceEvent = new EventEmitter<number>();

  multiselectConfig: MultiselectComponentModule[];

  multiConf = [];

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    const response = await this.getDataFromApi();

    for (let i = 0; i < response.length; i++) {

      let obj = {
        title: response[i].title,
        subtitle: response[i].subtitle,
        price: response[i].price,
        selected: response[i].selected,
        id: response[i].id,
        category:  response[i].category,
        hiddenContent: [
          {
            name: response[i].hiddenContent[i].name,
            subtitle: response[i].hiddenContent[i].subtitle,
            selected: response[i].hiddenContent[i].selected,
            price: response[i].hiddenContent[i].price,
            id: response[i].hiddenContent[i].id
          }
        ]
      }
      this.multiConf.push(obj);
    }
  }

  async getDataFromApi() {
    const url = 'https://4einhalb.com/wordpress/wp-content/uploads/2022/06/multiselect.json';
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
