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
    db.collection('ImgThumb').get().then(imgData => {
      if (imgData.length < 1) {
        this.getData();
      } else {
        this.db.collection('ImgThumb').get().then((config: any) => {
          this.serialThumbnail = config;
        }).then(() => {
          this.db.collection('ImgThumbMetal').get().then((config: any) => {
            this.metalThumbnail = config;
          })
        })
      }
    });
  }

  async getData() {
    const response = await this.getDataFromApi();
    const responseMetallic = await this.getDataFromApiMetal();

    for (let i = 0; i < response.length; i++) {
      this.db.collection('ImgThumb').add({
        name: response[i].name,
        id: response[i].id,
        price: response[i].price,
        selected: response[i].selected,
        color: response[i].color,
        category:  response[i].category,
      }).then(() => {
        this.db.collection('ImgThumb').get().then((config: any) => {
          this.serialThumbnail = config;
        }).then(() => {
          this.db.collection('ImgThumbMetal').get().then((config: any) => {
            this.metalThumbnail = config;
          })
        })
      });
    }

    for (let i = 0; i < responseMetallic.length; i++) {
      this.db.collection('ImgThumbMetal').add({
        name: responseMetallic[i].name,
        id: responseMetallic[i].id,
        price: responseMetallic[i].price,
        selected: responseMetallic[i].selected,
        color: responseMetallic[i].color,
        category:  responseMetallic[i].category,
      }).then(() => {
        this.db.collection('ImgThumbMetal').get().then((config: any) => {
          this.metalThumbnail = config;
        })
      });
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

  changeColor(data) {
    this.changeColorEvent.emit(data.category);
    db.collection('ImgThumb').doc({ }).update({
      selected: false,
    })
    db.collection('ImgThumbMetal').doc({ }).update({
      selected: false,
    })
    db.collection('ImgThumb').doc({id: data.id }).update({
      selected: true,
    }).then(() => {
      db.collection('ImgThumb').get().then(imgData => {
        this.serialThumbnail = imgData;
      }).then(() => {
        db.collection('ImgThumbMetal').get().then(imgData => {
          this.metalThumbnail = imgData;
        })
      })
    })
  }

  changeColorMetal(data) {
    this.changeColorEvent.emit(data.category);
    db.collection('ImgThumb').doc({ }).update({
      selected: false,
    })
    db.collection('ImgThumbMetal').doc({ }).update({
      selected: false,
    })
    db.collection('ImgThumbMetal').doc({id: data.id }).update({
      selected: true,
    }).then(() => {
      db.collection('ImgThumbMetal').get().then(imgData => {
        this.metalThumbnail = imgData;
      }).then(() => {
        db.collection('ImgThumb').get().then(imgData => {
          this.serialThumbnail = imgData;
        })
      })
    })
  }
}
