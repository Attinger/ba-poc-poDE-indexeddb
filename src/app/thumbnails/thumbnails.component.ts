import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {db} from 'src/app/app.globals';
import {AccordionChangeEvent} from '@porsche-design-system/components-angular/lib/types';

@Component({
  selector: 'app-thumbnails',
  templateUrl: './thumbnails.component.html',
  styleUrls: ['./thumbnails.component.scss']
})
export class ThumbnailsComponent implements OnInit {

  constructor() { }

  public db = db;
  public isAccordion1Open = false;

  @Output() changeColorEvent = new EventEmitter<string>();

  public serialThumbnail = [];
  public metalThumbnail = [];

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    const response = await this.getDataFromApi();
    const responseMetallic = await this.getDataFromApiMetal();

    for (let i = 0; i < response.length; i++) {
      const obj = {
        name: response[i].name,
        id: response[i].id,
        price: response[i].price,
        selected: response[i].selected,
        color: response[i].color,
        category:  response[i].category,
      }

      this.serialThumbnail.push(obj);
    }

    for (let i = 0; i < responseMetallic.length; i++) {
      const obj = {
        name: responseMetallic[i].name,
        id: responseMetallic[i].id,
        price: responseMetallic[i].price,
        selected: responseMetallic[i].selected,
        color: responseMetallic[i].color,
        category:  responseMetallic[i].category,
      }

      this.metalThumbnail.push(obj);
    }
  }

  async getDataFromApi() {
    const url = 'https://4einhalb.com/wordpress/wp-content/uploads/2022/06/serialthumb.json';
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }

  async getDataFromApiMetal() {
    const url = 'https://4einhalb.com/wordpress/wp-content/uploads/2022/06/metalthumb.json';
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
