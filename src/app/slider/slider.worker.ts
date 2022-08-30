/// <reference lib="webworker" />

import {db} from '../app.globals';

const dataBase = db;

async function parseURI(d){
  const reader = new FileReader();    /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader */
  reader.readAsDataURL(d);          /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL */
  return new Promise((res, rej) => {  /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise */
    reader.onload = (e) => {        /* https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload */
      res(e.target.result)
    }
  })
}

async function getDataBlob(data: any){
  const response = await getDataFromURL();

  for (let i = 0; i < response.length; i++) {
    const collection = response[i].collection;
    const convertedImages = [];

    for(let y = 0; y < collection.length; y++) {
      const resUrl = await fetch(collection[y].url);
      const getBlob = await resUrl.blob();
      const getUri = await parseURI(getBlob);
      const newObj = {
        url: getUri
      }
      convertedImages.push(newObj);
    }

    dataBase.collection('Img').add({
      category: response[i].category,
      selected: response[i].selected,
      collection: convertedImages
    })
  }
}

async function getDataFromURL() {
  const url = 'https://d36v07xmmuuq9w.cloudfront.net/slider.json';
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

addEventListener('message', ({data}) => {
  const response = getDataBlob(data);
});
