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

  ngOnInit(): void {
    this.db.collection('Light').get().then((users: any) => {
      if (users.length < 1) {
        this.getData();
      } else {
        this.db.collection('Light').get().then((config: any) => {
          this.lightConfig = config;
        })
      }
    });
  }

  async getData() {
    const response = await this.getDataFromApi();

    for (let i = 0; i < response.length; i++) {
      this.db.collection('Light').add({
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
        this.db.collection('Light').get().then((config: any) => {
          this.lightConfig = config;
        })
      })
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

  async chooseConfig(data: any) {
    await this.db.collection('Light').get().then((config: any) => {
      for (let i = 0; i < config.length; i++) {
        if (data.id == config[i].id) {
          if (config[i].selected == true) {
            db.collection('Light').doc({id: data.id}).update({
              selected: false,
            });
            db.collection('Price').doc({id: data.id}).update({
              selected: false,
            }).then(() => {
              this.priceEvent.emit(this.price);
            });
          }
          if (config[i].selected == false) {
            db.collection('Light').doc({id: data.id}).update({
              selected: true,
            });
            db.collection('Price').doc({id: data.id}).update({
              selected: true,
            }).then(() => {
              this.priceEvent.emit(this.price);
            });
          }
        }
      }
    })
  }
}
