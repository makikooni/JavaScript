function setup(){
    createCanvas(500, 500);
    background(0);

    noStroke();
}

function draw(){
    let randomR = random(0,255);
    let randomG = random(0,255);
    let randomB = random(0,255);

    fill(randomR,randomG,randomB);
    
    rect(mouseX,mouseY,10,10);
}