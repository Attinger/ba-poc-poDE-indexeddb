import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OptionselectComponentModule} from './optionselect.model';

// @ts-ignore
import {db} from 'src/app/app.globals';
import {AccordionChangeEvent} from '@porsche-design-system/components-angular/lib/types';

@Component({
  selector: 'app-optionselect',
  templateUrl: './optionselect.component.html',
  styleUrls: ['./optionselect.component.scss'],
})
export class OptionselectComponent implements OnInit {

  constructor() {}
  db = db;
  isAccordion1Open = false;
  hiddenContent = [];

  price: number;

  @Output() priceEvent = new EventEmitter<number>();

  optionselectConfig: OptionselectComponentModule[];

  optionselectConf = [];

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
      }
      this.optionselectConf.push(obj);
    }
  }

  async getDataFromApi() {
    const url = 'https://4einhalb.com/wordpress/wp-content/uploads/2022/06/optionselect.json';
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

  fetchNewData() {
    this.db.collection('Extras').get().then((config: any) => {
      this.optionselectConfig = config;
    })
  }
}
