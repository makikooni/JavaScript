let picture;
let scale = 10;
let pictureWidth;
let pictureHeight;
let tilesX;
let tilesY;

function preload(){
  picture = loadImage("image.jpeg");
}

function setup() {
  pictureHeight = picture.height;
  pictureWidth = picture.width;
  
  createCanvas(picture.width, picture.height);

  tilesX = pictureWidth/scale;
  tilesY = pictureHeight/scale;
  tileWidth = width/tilesX;
  tileHeight = height/tilesY;

  picture.resize(tilesX,tilesY);
}

function draw() {
  background(220);
//stretrching the image to do width and height after downsizing it,pixelates it 
  //image(picture, 0, 0, width, height);
  for (let x = 0; x < tilesX; x++){
    for (let y = 0; y <tilesY; y++){
      let pixel = picture.get(x, y);
      let color = brightness(pixel);

      let char = "!";
       
      if (color < 20){
        char = "."
      } else if(color <30){
        char = ","
      } else if(color <40){
        char = "░"
      }
      text(char,x * tileWidth, y * tileHeight);

    }
  }
}

/*
function draw() {
  background(220);
  for (let x = 0; x < tilesX; x++){
    for (let y = 0; y <tilesY; y++){
      let pixel = picture.get(x, y);
      let color = brightness(pixel);

      let char = "X";
      text(char,x * tileWidth, y * tileHeight);

      //fill(color) //<- basic
      //fill(color * mouseX); //<- based on mouse positions 
      fill(color % mouseX);

    rect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
    }
  }
}
*/