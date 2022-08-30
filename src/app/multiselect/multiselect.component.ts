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

  ngOnInit(): void {
    this.db.collection('Interieur').get().then((table: any) => {
      if (table.length < 1) {
        this.getData();
      } else {
        this.db.collection('Interieur').get().then((config: any) => {
          this.multiselectConfig = config;
          if (config[0].selected == true) {
            this.hiddenContent = config[0].hiddenContent;
          }
        })
      }
    });
  }

  async getData() {
    const response = await this.getDataFromApi();

    for (let i = 0; i < response.length; i++) {
      this.db.collection('Interieur').add({
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
      });
      this.db.collection('Price').add({
        price: response[i].price,
        category: response[i].category,
        selected: response[i].selected,
        id: response[i].id,
      }).then(() => {
        this.db.collection('Interieur').get().then((config: any) => {
          this.multiselectConfig = config;
          if (config[0].selected == true) {
            this.hiddenContent = config[0].hiddenContent;
          }
        })
      })
    }
  }

  async getDataFromApi() {
    const url = 'https://d36v07xmmuuq9w.cloudfront.net/multiselect.json';
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

  async chooseConfig(data: any) {
    this.hiddenContent = [];
    for (let i = 0; i < data.hiddenContent.length; i++) {
      const obj = data.hiddenContent[i];
      this.hiddenContent.push(obj);
    }

    await this.db.collection('Interieur').get().then((config: any) => {
      const dataSet = config[0];
      if(dataSet.selected == true) {
        db.collection('Interieur').doc({id: data.id}).update({
          selected: false,
        }).then(() => {
          this.fetchNewData();
        });;
      }
      if (dataSet.selected == false) {
        db.collection('Interieur').doc({id: data.id}).update({
          selected: true,
        }).then(() => {
          this.fetchNewData();
        });
      }
    })
  }

  async chooseSecondConfig(configData) {
    await this.db.collection('Interieur').get().then((config: any) => {
      const dataSetHiddenConfig = config[0].hiddenContent;
      if (dataSetHiddenConfig[0].selected == true) {
        dataSetHiddenConfig[0].selected = false;
        db.collection('Interieur').doc({}).update({
          hiddenContent: dataSetHiddenConfig,
        })
      } else {
        dataSetHiddenConfig[0].selected = true;
        db.collection('Interieur').doc({}).update({
          hiddenContent: dataSetHiddenConfig,
        })
      }
    })
  }

  fetchNewData() {
    this.db.collection('Interieur').get().then((config: any) => {
      this.multiselectConfig = config;
    })
  }
}
