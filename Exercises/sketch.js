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
  h: 500
};

let totalAreaFilled = 0; // Tracks the total area filled in the square
let objectSize = 10; // Size of the falling objects
let totalObjectsNeeded; // Total objects needed to fill the square
let objectArea = objectSize * objectSize; // Area of each object (assuming square objects)
let columnHeights = Array(Math.floor(squareBounds.w / objectSize)).fill(0); // To track how high each column has been filled

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  totalObjectsNeeded = Math.floor((squareBounds.w * squareBounds.h) / objectArea); // Total objects needed
  
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

  // Draw the outline of the vegetable (square)
  drawVegetableOutline(currentVegetable);

  // Drop and draw shapes representing nutrients
  handleFallingObjects();

  // Display a percentage-based status bar or similar visual feedback
  showNutrientFillingStatus();
}

// Reset the falling objects when the vegetable changes
function resetFallingObjects() {
  fallingObjects = [];
  totalAreaFilled = 0; // Reset the filled area when the vegetable changes
  columnHeights = Array(Math.floor(squareBounds.w / objectSize)).fill(0); // Reset column heights
}

// Draw the outline of the current vegetable using square shapes
function drawVegetableOutline(vegName) {
  stroke(0);
  noFill();
  rect(squareBounds.x, squareBounds.y, squareBounds.w, squareBounds.h);
}

// Handle the falling objects
function handleFallingObjects() {
  let nutrientData = vegetables[currentVegetable];
  
  // Generate new objects if the square is not filled yet
  if (fallingObjects.length < totalObjectsNeeded && totalAreaFilled < squareBounds.w * squareBounds.h) {
    let nutrient = getRandomNutrient(nutrientData);
    let newObject = createFallingObject(nutrient);
    fallingObjects.push(newObject);
  }

  // Update and draw falling objects
  for (let obj of fallingObjects) {
    if (!obj.landed) {
      obj.y += obj.speed; // Move the object down

      // Check if the object has reached its landing position
      if (obj.y + obj.size >= squareBounds.y + squareBounds.h - columnHeights[Math.floor((obj.x - squareBounds.x) / objectSize)]) {
        obj.y = squareBounds.y + squareBounds.h - columnHeights[Math.floor((obj.x - squareBounds.x) / objectSize)] - obj.size;  // Set it to the correct position
        obj.landed = true; // Mark as landed
        columnHeights[Math.floor((obj.x - squareBounds.x) / objectSize)] += obj.size; // Update column height
        totalAreaFilled += objectArea; // Increment the total area filled
      }

      fill(obj.color);
      noStroke();
      if (obj.type === "circle") {
        ellipse(obj.x, obj.y, obj.size, obj.size);
      } else if (obj.type === "rect") {
        rect(obj.x, obj.y, obj.size, obj.size);
      }
    } else {
      // Once the object has landed, just keep it in place
      fill(obj.color);
      noStroke();
      if (obj.type === "circle") {
        ellipse(obj.x, obj.y, obj.size, obj.size);
      } else if (obj.type === "rect") {
        rect(obj.x, obj.y, obj.size, obj.size);
      }
    }
  }

  // If square is fully filled, stop the loop from generating new objects
  if (totalAreaFilled >= squareBounds.w * squareBounds.h) {
    noLoop();  // Stop the draw loop
  }
}

// Get a random nutrient based on percentages
function getRandomNutrient(nutrientData) {
  let total = 0;
  for (let key in nutrientData) total += nutrientData[key];

  let randomValue = random(total);
  for (let key in nutrientData) {
    randomValue -= nutrientData[key];
    if (randomValue <= 0) return key;
  }
}

// Create a new falling object with the size adjusted to fill the square
function createFallingObject(nutrient) {
  let types = ["circle", "rect"]; // Shapes to represent nutrients
  let colors = {
    salt: "blue",
    fibre: "green",
    protein: "red",
    vitamins: "yellow",
  };

  // Random position within the square bounds
  let xPos = random(squareBounds.x, squareBounds.x + squareBounds.w - objectSize);

  return {
    x: xPos, // Random horizontal position
    y: -10, // Start above the canvas
    size: objectSize, // Fixed size for all objects
    speed: random(2, 5), // Falling speed
    color: colors[nutrient],
    type: random(types), // Random shape type
    landed: false, // Track if it has landed
  };
}

// Show the nutrient filling status
function showNutrientFillingStatus() {
  let yOffset = 20;
  for (let nutrient in vegetables[currentVegetable]) {
    let percentage = vegetables[currentVegetable][nutrient];
    fill(200);
    rect(10, yOffset, 100, 10);
    fill("green");
    rect(10, yOffset, map(percentage, 0, 100, 0, 100), 10);
    yOffset += 20;
  }
}

// Check if a falling object is inside the square outline
function isInsideSquare(obj) {
  return (
    obj.x + obj.size > squareBounds.x &&
    obj.x < squareBounds.x + squareBounds.w &&
    obj.y + obj.size > squareBounds.y &&
    obj.y < squareBounds.y + squareBounds.h
  );
}
