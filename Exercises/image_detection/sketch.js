let model;
let picture;
let label = "nothing";
let circleSize = 10;
let confidence = 0;

function preload(){
  //model = ml5.imageClassifier("MobileNet");
  model = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/nmf7FmwpY/");
  //picture = loadImage("pic.png");
}

function gotResults(results){
  console.log(results)
  confidence = results[0].confidence;
  label = results[0].label;
} 
function setup() {
  //createCanvas(500, 400);
  createCanvas(640, 480);

  //live capture
  picture = createCapture(VIDEO);
  //hiding 2nd camera view
  picture.hide()
  //model.classify(picture,gotResults);
  model.classifyStart(picture,gotResults);
}

function draw() {
  background(0);
  image(picture,0,0, width, height);
  if (confidence <= 0.98){
    text(("maybe " + label), 10,height -10);
  } else{
  text(label, 10,height -10)
  };
  textSize(30);

  if (label === "Human" && confidence > 0.98 && circleSize <= 400) {
    console.log("I see a human.")
    circleSize += 1;
  } else if (label === "Mug" && confidence > 0.98){
    console.log("I see a mug.")
    circleSize -= 1;
  } else if (label === "Teddy Bear" && confidence > 0.98){
    console.log("I see a plushie.")
    circleSize -= 1;
}   else{
    console.log("I do not know what I see")
  };

  fill(0,255,0);
  rect(width/2,height/2);

  fill(255,105,180);
  circle(width/2, height/2, circleSize)
}
