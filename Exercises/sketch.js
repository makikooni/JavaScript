let dishes = {
  "Margherita Pizza": { salt: 0.8, fibre: 4.4, protein: 17.7, sugars: 57.3, fat: 19.8 },
  "Spaghetti Bolognese": { salt: 0.3, fibre: 6.2, protein: 21.8, sugars: 56.1, fat: 15.6 },
  "Lasagna": { salt: 1.48, fibre: 2.45, protein: 32.29, sugars: 32.29, fat: 31.48 },
  "Greek Salad": { salt: 1.4, fibre: 8.2, protein: 16.4, sugars: 24.6, fat: 49.3 },
  "Hamburger": { salt: 20.6, fibre: 3.7, protein: 25, sugars: 10, fat: 30 },
  "Lentil Soup": { salt: 5, fibre: 25, protein: 28.1, sugars: 46.8, fat: 20.6 }, 
  "Vegetable Stir Fry (with tofu)": { salt: 3, fibre: 13.9, protein: 13.9, sugars: 41.6, fat: 27.7 }, 
  "Kit Kat bar": { salt: 0.08, fibre: 2, protein: 7.1, sugars: 63.2, fat: 27.5 }, 
  "Butter croissant": { salt: 0.61, fibre: 2.3, protein: 11.5, sugars: 57.8, fat: 27.7 },
  "Hard boiled egg": { salt: 0.62, fibre: 1.7, protein: 52.3, sugars: 1.7, fat: 43.6 } 
};

let icons = {};
let currentDishes = ["Margherita Pizza", "Margherita Pizza"];
let fallingObjects = [[], []];
let animatedPercentages = [{}, {}];
let canvasWidth = 1600;
let canvasHeight = 800;

let containers = [
  { // Left panel
    x: 70,
    y: 150,
    dropdownX: 260,
    nutrientX: 70,
    animationX: 370
  },
  { // Right panel
    x: 750,
    y: 150,
    dropdownX: 940,
    nutrientX: 750,
    animationX: 1050
  }
];

let objectSize = 20;
let columnHeights = [Array(15).fill(0), Array(15).fill(0)];
let totalAreaFilled = [0, 0];
let customFont;

const dishIcons = {
  "Margherita Pizza": "pizza",
  "Spaghetti Bolognese": "pasta",
  "Greek Salad": "salad",
  "Hamburger": "hamburger",
  "Lasagna": "las",
  "Lentil Soup": "lentil",
  "Vegetable Stir Fry (with tofu)": "stir",
  "Kit Kat bar": "kitkat",
  "Butter croissant": "cro",
  "Hard boiled egg": "egg"
};

function preload() {
  // Load nutrient icons
  icons.salt = loadImage('images/salt.png');
  icons.fibre = loadImage('images/fibre.png');
  icons.protein = loadImage('images/protein.png');
  icons.sugars = loadImage('images/sugar.png');
  icons.fat = loadImage('images/fat.png');
  
  // Load dish icons
  icons.pizza = loadImage('images/pizza.png');
  icons.pasta = loadImage('images/pasta.png');
  icons.salad = loadImage('images/salad.png');
  icons.hamburger = loadImage('images/hamburger.png');
  icons.las = loadImage('images/las.png');
  icons.lentil = loadImage('images/lentil.png');
  icons.stir = loadImage('images/stir.png');
  icons.kitkat = loadImage('images/kitkat.png');
  icons.cro = loadImage('images/cro.png');
  icons.egg = loadImage('images/egg.png');

  customFont = loadFont('Inconsolata.ttf');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  
  containers.forEach((container, index) => {
    let dropdown = createSelect();
    dropdown.position(container.dropdownX, 80);
    dropdown.style('font-size', '18px');
    dropdown.style('background-color', '#f0f0f0');
    for (let dish in dishes) dropdown.option(dish);
    dropdown.changed(() => updateDish(index, dropdown.value()));
  });
}

function updateDish(index, dish) {
  currentDishes[index] = dish;
  fallingObjects[index] = [];
  totalAreaFilled[index] = 0;
  columnHeights[index].fill(0);
  loop();
}

function draw() {
  background(255, 255, 239);

   // Title
   textFont(customFont);
   textAlign(CENTER  , CENTER);
   textSize(40);
   fill(150);
   text("Nutrient Filling", canvasWidth/2 - 110 + 2, 32);  // Shadow
   fill(0);
   text("Nutrient Filling", canvasWidth/2 - 110, 30);      // Main text
   textSize(17);
   textAlign(LEFT);

  containers.forEach((container, index) => {
    drawContainer(container, index);
  });
}

function drawContainer(container, index) {
  // Left side: Nutrient information
  push();
  translate(container.nutrientX, container.y);
  drawNutrientInfo(index);
  pop();

  // Right side: Animation
  push();
  translate(container.animationX, container.y);
  drawAnimationContainer(index);
  pop();



  // "Choose product" text
  textSize(17);
  textAlign(LEFT);
  fill(0);
  text("Choose product:", container.x + 50, 90);
}

function drawNutrientInfo(index) {
  // Nutrient bars
  let yOffset = 0;
  let nutrientData = dishes[currentDishes[index]];
  
  for (let nutrient in nutrientData) {
    if (!animatedPercentages[index][nutrient]) {
      animatedPercentages[index][nutrient] = 0;
    }
    
    let target = map(nutrientData[nutrient], 0, 100, 0, 100);
    animatedPercentages[index][nutrient] = lerp(animatedPercentages[index][nutrient], target, 0.01);
    
    // Bar background
    fill(220);
    stroke(150);
    rect(0, yOffset, 200, 20, 0, 10, 10, 0);
    
    // Progress
    fill(getColor(nutrient));
    noStroke();
    rect(1, yOffset + 1, map(animatedPercentages[index][nutrient], 0, 100, 0, 200), 18, 0, 10, 10, 0);
    
    // Icon
    image(icons[nutrient], -40, yOffset - 5, 30, 30);
    
    // Label
    fill(0);
    text(nutrient, 210, yOffset + 10);
    yOffset += 40;
  }

  // Combined bar
  let total = Object.values(nutrientData).reduce((a, b) => a + b, 0);
  yOffset += 20;
  let currentX = 0;
  
  for (let nutrient in nutrientData) {
    let width = map(nutrientData[nutrient], 0, total, 0, 200);
    fill(getColor(nutrient));
    rect(currentX, yOffset, width, 10);
    currentX += width;
  }
  
  // Dish icon
  const iconName = dishIcons[currentDishes[index]];
  if (iconName && icons[iconName]) {
    tint(170);
    image(icons[iconName], 0, yOffset + 50, 200, 200);
    noTint();
  }
}


function drawAnimationContainer(index) {
  // Container outline (keep the stroke for the container only)
  stroke(150);
  noFill();
  rect(0, 0, 300, 500);

  // Falling objects
  handleFallingObjects(index);
  drawFallingObjects(index);
}

function drawAnimationContainer(index) {
  // Container outline (keep the stroke for the container only)
  stroke(150);
  noFill();
  rect(0, 0, 300, 500);

  // Falling objects
  handleFallingObjects(index);
  drawFallingObjects(index);
}

function handleFallingObjects(index) {
  let nutrientData = dishes[currentDishes[index]];
  if (fallingObjects[index].length < 375 && totalAreaFilled[index] < 150000) {
    let nutrient = getRandomNutrient(nutrientData);
    let newObj = createFallingObject(index, nutrient);
    if (newObj) fallingObjects[index].push(newObj);
  }
}

function createFallingObject(index, nutrient) {
  let colors = {
    salt: "#A7C6ED", fibre: "#A7D7A9", protein: "#B79B6D",
    sugars: "#F7C5D1", fat: "#F9E076"
  };
  
  let columnIndex = floor(random(15));
  
  // Count how many falling objects are in this column and not landed
  let countFalling = 0;
  for (let obj of fallingObjects[index]) {
    if (!obj.landed && floor(obj.x / 20) === columnIndex) {
      countFalling++;
    }
  }
  
  // Check if adding this object would exceed column height
  if (columnHeights[index][columnIndex] + (countFalling * 20) + 20 > 500) {
    return null;
  }
  
  return {
    x: columnIndex * 20,
    y: -20, // Start above the container
    size: 20,
    speed: random(2, 5),
    color: colors[nutrient],
    landed: false
  };
}

function drawFallingObjects(index) {
  noStroke(); // Remove stroke for falling squares
  fallingObjects[index].forEach(obj => {
    if (!obj.landed) {
      obj.y += obj.speed;
      let columnIndex = floor(obj.x / 20);
      let maxY = 500 - columnHeights[index][columnIndex] - 20;
      
      if (obj.y >= maxY) {
        obj.y = maxY;
        obj.landed = true;
        columnHeights[index][columnIndex] += 20;
        totalAreaFilled[index] += 400;
      }
    }
    fill(obj.color);
    rect(obj.x, obj.y, 20, 20);
  });

  // Ensure no squares exceed the container height
  for (let i = 0; i < columnHeights[index].length; i++) {
    if (columnHeights[index][i] > 500) {
      columnHeights[index][i] = 500; // Cap the height at the container's height
    }
  }
}
function getColor(nutrient) {
  const colors = {
    salt: "#A7C6ED", fibre: "#A7D7A9", protein: "#B79B6D",
    sugars: "#F7C5D1", fat: "#F9E076"
  };
  return colors[nutrient];
}

function getRandomNutrient(nutrientData) {
  let total = Object.values(nutrientData).reduce((a, b) => a + b, 0);
  let randomValue = random(total);
  for (let key in nutrientData) {
    randomValue -= nutrientData[key];
    if (randomValue <= 0) return key;
  }
}