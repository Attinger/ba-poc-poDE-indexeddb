import {AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import {SwiperComponent} from 'swiper/angular';
import {db} from 'src/app/app.globals';
import {SwiperOptions} from 'swiper';
import SwiperCore, {
  Pagination
} from 'swiper';

SwiperCore.use([Pagination]);
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SliderComponent implements OnInit, AfterContentChecked {
  @ViewChild('swiper') swiper: SwiperComponent;

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: true,
    autoHeight: true, // enable auto height
  };

  @Input() otherCarColor: string;


  public db = db;
  public dataStore = [];
  public selectedCar: any;
  public imgSrc = [];

  constructor() { }


  ngAfterContentChecked() {
    if (this.swiper){
      this.swiper.updateSwiper({});
    }
  }

  ngOnChanges() {
    if(this.otherCarColor) {
      db.collection('Img').doc({ }).update({
        selected: false,
      }).then(() => {
        db.collection('Img').doc({category: this.otherCarColor }).update({
          selected: true,
        }).then(() => {
          db.collection('Img').get().then((selection: any) => {
            this.dataStore = selection;
            for (let i = 0; i < this.dataStore.length; i++) {
              if (this.dataStore[i].selected === true) {
                this.selectedCar = this.dataStore[i];
                this.imgSrc = this.selectedCar.collection;
              }
            }
          });
        });
      });
    }
  }

  ngOnInit() {
    this.db.collection('Img').get().then((users: any) => {
      if (users.length < 1) {
        this.createDataSet();
        if (typeof Worker !== 'undefined') {
          // Create a new
          const worker = new Worker(new URL('./slider.worker', import .meta.url));
          worker.onmessage = ({data}) => {
            console.log(data);
          };
          worker.postMessage(this.dataStore);
        }
      } else {
        this.db.collection('Img').get().then((selection: any) => {
          this.dataStore = selection;
          for (let i = 0; i < this.dataStore.length; i++) {
            if (this.dataStore[i].selected === true) {
              this.selectedCar = this.dataStore[i];
              this.imgSrc = this.selectedCar.collection;
            }
          }
        });
      }
    });
  }

  async createDataSet() {
    const response = await this.getDataFromApi();
    this.dataStore = response;

    for (let i = 0; i <  this.dataStore.length; i++) {
      // NOTE: Looping through data and collecting all only the White Collection.
      if (this.dataStore[i].category === 'white') {
        const collections =  this.dataStore[i].collection;
        for (let y = 0; y < collections.length; y++) {
          // NOTE: Fill all collections inside ImgArray.
          const img = collections[y];
          this.imgSrc.push(img);
        }
      }
    }
  }
  async getDataFromApi() {
    const url = 'https://4einhalb.com/wordpress/wp-content/uploads/2022/06/slider.json';
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (error) {
      console.log(error);
    }
  }
}
