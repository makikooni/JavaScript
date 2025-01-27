let vegetables = {
  "Carrot": { salt: 10, fibre: 30, protein: 20, vitamins: 40 },
  "Broccoli": { salt: 5, fibre: 40, protein: 25, vitamins: 30 },
  "Tomato": { salt: 15, fibre: 20, protein: 10, vitamins: 55 },
};

let currentVegetable = "Carrot"; // Default vegetable
let fallingObjects = [];
let canvasWidth = 600, canvasHeight = 800;
let squareBounds = {
  x: canvasWidth / 2 - 150,
  y: canvasHeight / 2 - 250,
  w: 300,
  h: 500,
};

let totalAreaFilled = 0; // Tracks the total area filled in the square
let objectSize = 20; // Size of the falling objects (squares)
let totalObjectsNeeded; // Total objects needed to fill the square
let objectArea = objectSize * objectSize; // Area of each object
let columnHeights = Array(Math.floor(squareBounds.w / objectSize)).fill(0); // Track column heights

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  totalObjectsNeeded = Math.floor((squareBounds.w * squareBounds.h) / objectArea);

  // Dropdown menu for vegetable selection
  let dropdown = createSelect();
  dropdown.position(10, 10);
  for (let veg in vegetables) {
    dropdown.option(veg);
  }
  dropdown.changed(() => {
    currentVegetable = dropdown.value();
    resetFallingObjects();
  });
}

function draw() {
  background(240);

  // Draw the outline of the vegetable container
  drawVegetableOutline();

  // Handle and display falling objects
  handleFallingObjects();

  // Display a nutrient filling status bar
  showNutrientFillingStatus();
}

// Reset the falling objects when the vegetable changes
function resetFallingObjects() {
  fallingObjects = [];
  totalAreaFilled = 0;
  columnHeights.fill(0); // Reset column heights
  loop(); // Restart the draw loop
}

// Draw the outline of the vegetable container
function drawVegetableOutline() {
  stroke(0);
  noFill();
  rect(squareBounds.x, squareBounds.y, squareBounds.w, squareBounds.h);
}

// Handle the falling objects
function handleFallingObjects() {
  let nutrientData = vegetables[currentVegetable];

  // Generate new objects if the square is not filled
  if (fallingObjects.length < totalObjectsNeeded && totalAreaFilled < squareBounds.w * squareBounds.h) {
    let nutrient = getRandomNutrient(nutrientData);
    let newObject = createFallingObject(nutrient);
    if (newObject) {
      fallingObjects.push(newObject);
    }
  }

  // Update and draw falling objects
  for (let obj of fallingObjects) {
    if (!obj.landed) {
      obj.y += obj.speed; // Move the object down

      // Check if the object has reached its landing position
      let columnIndex = Math.floor((obj.x - squareBounds.x) / objectSize);
      let maxY = squareBounds.y + squareBounds.h - columnHeights[columnIndex] - obj.size;

      if (obj.y >= maxY) {
        obj.y = maxY;
        obj.landed = true;
        columnHeights[columnIndex] += obj.size; // Update column height
        totalAreaFilled += objectArea; // Increment the total area filled
      }
    }

    // Draw the object
    fill(obj.color);
    noStroke();
    rect(obj.x, obj.y, obj.size, obj.size);
  }

  // Stop the draw loop when the square is fully filled
  if (totalAreaFilled >= squareBounds.w * squareBounds.h) {
    noLoop();
  }
}

// Get a random nutrient based on their relative weights
function getRandomNutrient(nutrientData) {
  let total = Object.values(nutrientData).reduce((a, b) => a + b, 0);
  let randomValue = random(total);
  for (let key in nutrientData) {
    randomValue -= nutrientData[key];
    if (randomValue <= 0) return key;
  }
}

// Create a new falling object aligned to a column
function createFallingObject(nutrient) {
  let colors = {
    salt: "blue",
    fibre: "green",
    protein: "red",
    vitamins: "yellow",
  };

  // Select a random column
  let columnIndex = Math.floor(random(columnHeights.length));
  let xPos = squareBounds.x + columnIndex * objectSize;

  // Check if the column is full
  if (columnHeights[columnIndex] + objectSize > squareBounds.h) {
    return null; // Reject object if the column is full
  }

  // Set the initial y position to the current column height
  let yPos = squareBounds.y + columnHeights[columnIndex];

  // Spawn object at the top of the column
  return {
    x: xPos,
    y: yPos, // Set the y position relative to the column height
    size: objectSize,
    speed: random(2, 5), // Falling speed
    color: colors[nutrient],
    landed: false,
  };
}

// Display the nutrient filling status
function showNutrientFillingStatus() {
  let yOffset = 20;
  for (let nutrient in vegetables[currentVegetable]) {
    let percentage = vegetables[currentVegetable][nutrient];
    fill(200);
    rect(10, yOffset, 100, 10);
    fill("green");
    rect(10, yOffset, map(percentage, 0, 100, 0, 100), 10);
    fill(0);
    textAlign(LEFT, CENTER);
    text(nutrient, 120, yOffset + 5);
    yOffset += 20;
  }
}
