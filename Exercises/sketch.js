let vegetables = {
  "Carrot": { salt: 10, fibre: 30, protein: 20, vitamins: 40 },
  "Broccoli": { salt: 5, fibre: 40, protein: 25, vitamins: 30 },
  "Tomato": { salt: 15, fibre: 20, protein: 10, vitamins: 55 },
};

let currentVegetable = "Carrot"; // Default vegetable
let fallingObjects = [];
let canvasWidth = 600, canvasHeight = 1000;
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

  // Dropdown menu for vegetable selection (moved to the right)
  let dropdown = createSelect();
  dropdown.position(150, 80); 
  for (let veg in vegetables) {
    dropdown.option(veg);
  }
  dropdown.changed(() => {
    currentVegetable = dropdown.value();
    resetFallingObjects();
  });
}


function draw() {
  background(255,255,239);

  // Title text at the top (added to draw())
  textAlign(CENTER, CENTER);
  textSize(40);
  fill(0);
  text("Nutrient Filling", canvasWidth / 2, 30); // Display title at the top
  
  // Change basic text size for later
  textSize(20);
  textAlign(LEFT);
  textSize(16);
  fill(0);
  text("Choose product:", 10, 80); // Adjusted y-position

  // Draw the outline of the vegetable container
  drawVegetableOutline();

  // Handle and display falling objects
  handleFallingObjects();

  // Display individual nutrient filling status bars
  showNutrientFillingStatus();

  // Display the combined nutrient progress bar
  showCombinedNutrientStatus();
}

// Show the combined nutrient filling status bar
function showCombinedNutrientStatus() {
  let yOffset = 120 + (Object.keys(vegetables[currentVegetable]).length * 20); // Set yOffset directly below the last individual bar
  let nutrientData = vegetables[currentVegetable];

  // Calculate the total sum of all nutrient values
  let totalNutrientValue = Object.values(nutrientData).reduce((sum, value) => sum + value, 0);

  let xOffset = 10; // X position for the combined bar
  let barWidth = 100; // Width of the combined bar
  let totalWidth = 0; // Total width accumulated for filling the combined bar

  // Loop through each nutrient and draw its portion in the combined bar
  for (let nutrient in nutrientData) {
    let nutrientValue = nutrientData[nutrient];
    let percentage = map(nutrientValue, 0, totalNutrientValue, 0, 100); // Calculate the percentage for the current nutrient

    // Draw the colored segment of the combined progress bar
    fill(getColorForNutrient(nutrient)); // Set the color for the nutrient
    rect(xOffset, yOffset, map(percentage, 0, 100, 0, barWidth), 10); // Draw the segment

    // Update xOffset for the next nutrient segment
    xOffset += map(percentage, 0, 100, 0, barWidth); 
  }

  // Display text for the combined progress bar
  fill(0);
  textAlign(LEFT, CENTER);
  text("Combined Nutrients", 120, yOffset + 5); // Label for the combined nutrient bar
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

function showNutrientFillingStatus() {
  let yOffset = 120; // Starting offset to move the bars down
  let nutrientData = vegetables[currentVegetable];

  // Loop through each nutrient to display its progress bar
  for (let nutrient in nutrientData) {
    let percentage = nutrientData[nutrient];
    let color = getColorForNutrient(nutrient); // Get the color for the current nutrient
    
    fill(200);
    rect(10, yOffset, 100, 10); // Background for the progress bar
    
    fill(color); // Fill the bar with the nutrient's color
    rect(10, yOffset, map(percentage, 0, 100, 0, 100), 10); // Progress bar
    
    fill(0); // Text color
    textAlign(LEFT, CENTER);
    text(nutrient, 120, yOffset + 5); // Display the nutrient name
    
    yOffset += 20; // Move down for the next bar
  }
}

// Get the color associated with each nutrient
function getColorForNutrient(nutrient) {
  let colors = {
    salt: "blue",
    fibre: "green",
    protein: "red",
    vitamins: "yellow",
  };
  
  return colors[nutrient]; // Return the color based on nutrient
}
