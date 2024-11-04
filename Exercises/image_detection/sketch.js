let model;
let picture;

function preload(){
  model = ml5.imageClassifier("MobileNet");
  picture = loadImage("pic.png");
}

function gotResults(results){
  console.log(results)
}
function setup() {
  createCanvas(500, 400);
  model.classify(picture,gotResults);
}

function draw() {
  background(0);
  image(picture,0,0, width, height);
}
