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

  ngOnInit(): void {
    this.db.collection('Extras').get().then((table: any) => {
      if (table.length < 1) {
        this.getData();
      } else {
        this.db.collection('Extras').get().then((config: any) => {
          this.optionselectConfig = config;
          if (config[0].selected == true) {
            this.hiddenContent = config[0].hiddenContent;
          }
        })
      }
    });
  }

  async getData() {
    const response = await this.getDataFromApi();

    const hiddenArray = [];

    for (let y = 0; y < response[0].hiddenContent.length; y++) {
      const hiddenArrayContent =
          {
            howMany: response[0].hiddenContent[y].howMany,
            selected: response[0].hiddenContent[y].selected,
            id: response[0].hiddenContent[y].id
          }
      hiddenArray.push(hiddenArrayContent);
    }

    for (let i = 0; i < response.length; i++) {
      this.db.collection('Extras').add({
        title: response[i].title,
        subtitle: response[i].subtitle,
        price: response[i].price,
        selected: response[i].selected,
        id: response[i].id,
        category:  response[i].category,
        hiddenContent: hiddenArray,
      });
      this.db.collection('Price').add({
        price: response[i].price,
        category: response[i].category,
        selected: response[i].selected,
        id: response[i].id,
      }).then(() => {
        this.db.collection('Extras').get().then((config: any) => {
          this.optionselectConfig = config;
          if (config[0].selected == true) {
            this.hiddenContent = config[0].hiddenContent;
          }
        })
      })
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

  async chooseConfig(data: any) {
    this.hiddenContent = [];
    for (let i = 0; i< data.hiddenContent.length; i++) {
      const obj = data.hiddenContent[i];
      this.hiddenContent.push(obj);
    }

    await this.db.collection('Extras').get().then((config: any) => {
      const dataSet = config[0];
      if (dataSet.selected == true) {
        db.collection('Extras').doc({id: data.id}).update({
          selected: false,
        }).then(() => {
          this.fetchNewData();
        });
      }
      if (dataSet.selected == false) {
        db.collection('Extras').doc({id: data.id}).update({
          selected: true,
        }).then(() => {
          this.fetchNewData();

        });
      }
    })
  }

  fetchNewData() {
    this.db.collection('Extras').get().then((config: any) => {
      this.optionselectConfig = config;
    })
  }

  async onChange(deviceValue) {
    let allOptions;
    await this.db.collection('Extras').get().then((config: any) => {
      allOptions = config[0].hiddenContent;
      for (let i = 0; i < allOptions.length; i++) {
        allOptions[i].selected = false;
        if (deviceValue == allOptions[i].howMany) {
          allOptions[i].selected = true;
        }
      }
    }).then(() => {
      db.collection('Extras').doc({}).update({
        hiddenContent: allOptions,
      })
    });
  }
}
