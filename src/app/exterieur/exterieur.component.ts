import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {ExterieurComponentModule} from './exterieur.model';

// @ts-ignore
import {db} from 'src/app/app.globals';
import {AccordionChangeEvent} from '@porsche-design-system/components-angular/lib/types';

@Component({
  selector: 'app-exterieur',
  templateUrl: './exterieur.component.html',
  styleUrls: ['./exterieur.component.scss']
})
export class ExterieurComponent implements OnInit {

  @Output() priceEvent = new EventEmitter<number>();
  constructor() {}

  db = db;
  isAccordion1Open = false;
  price: number;

  exterieurConfig: ExterieurComponentModule[];

  ngOnInit()  {
    this.db.collection('Exterieur').get().then((config: any) => {
      if (config.length < 1) {
        this.getData();
      } else {
        this.exterieurConfig = config;
      }
    });
  }

  onAccordion1Change(e: CustomEvent<AccordionChangeEvent>) {
    this.isAccordion1Open = e.detail.open;
  }

  async getData() {
    const response = await this.getDataFromApi();

    for (let i = 0; i < response.length; i++) {
      this.db.collection('Exterieur').add({
        title: response[i].title,
        subtitle: response[i].subtitle,
        price: response[i].price,
        selected: response[i].selected,
        id: response[i].id,
        category:  response[i].category,
      });
      this.db.collection('Price').add({
        price: response[i].price,
        category: response[i].category,
        selected: response[i].selected,
        id: response[i].id,
      }).then(() => {
        this.db.collection('Exterieur').get().then((config: any) => {
          this.exterieurConfig = config;
        })
      })
    }
  }

  async getDataFromApi() {
    const url = 'https://4einhalb.com/wordpress/wp-content/uploads/2022/06/test.json';
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  async chooseConfig(data: any) {
    await db.collection('Exterieur').doc({}).update({
      selected: false,
    })
    await db.collection('Price').doc({}).update({
      selected: false,
    }).then(() => {
      this.priceEvent.emit(this.price);
    })
    await db.collection('Exterieur').doc({id: data.id}).update({
      selected: true,
    })
    await db.collection('Price').doc({id: data.id}).update({
      selected: true,
    }).then(() => {
      this.priceEvent.emit(this.price);
    });
  }
}
