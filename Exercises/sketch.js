let dishes = {
  "Margherita Pizza": { salt: 15, fibre: 3, protein: 8, vitamins: 15, fat: 22 },
  "Spaghetti Bolognese": { salt: 12, fibre: 4, protein: 20, vitamins: 10, fat: 18 },
  "Lasagna": { salt: 18, fibre: 5, protein: 25, vitamins: 12, fat: 20 },
  "Caesar Salad": { salt: 8, fibre: 6, protein: 10, vitamins: 25, fat: 14 },
  "Hamburger": { salt: 20, fibre: 2, protein: 25, vitamins: 10, fat: 30 },
  "Lentil Soup": { salt: 5, fibre: 25, protein: 30, vitamins: 20, fat: 20 }, // Added Lentil Soup
  "Vegetable Stir Fry (with tofu)": { salt: 8, fibre: 18, protein: 25, vitamins: 35, fat: 14 } // Added Vegetable Stir Fry
};

let currentDish = "Margherita Pizza"; // Default dish
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
let customFont; 

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  totalObjectsNeeded = Math.floor((squareBounds.w * squareBounds.h) / objectArea);
  customFont = loadFont('Inconsolata.ttf'); // Make sure the font file is in the correct folder

  // DROPDOWN MENU
  /////////////////////////////
  let dropdown = createSelect();
  dropdown.position(320, 80); // Center the dropdown horizontally
  dropdown.style('font-size', '18px');
  dropdown.style('background-color', '#f0f0f0');
  dropdown.style('padding', '8px');
  dropdown.style('border-radius', '5px');
  for (let dish in dishes) {
    dropdown.option(dish);
  }
  dropdown.changed(() => {
    currentDish = dropdown.value();
    resetFallingObjects();
  });
}


function draw() {
  background(255,255,239);

  // TITLE AND SHADOW
  ///////////////////////////////
  textAlign(CENTER, CENTER);
  textSize(40);
  textFont(customFont)
  fill(150); // Shadow color (light gray)
  text("Nutrient Filling", canvasWidth / 2 + 2, 32); // Slightly offset to create shadow
 
  fill(0);
  text("Nutrient Filling", canvasWidth / 2, 30); // Display title at the top
  
  // CHOOSE TEXT
  ///////////////////////////////

  textSize(20);
  textAlign(LEFT);
  textSize(17);
  fill(0);
  text("Choose product:", 180, 84); // Adjusted y-position

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
  let yOffset = 120 + (Object.keys(dishes[currentDish]).length * 20); // Set yOffset directly below the last individual bar
  let nutrientData = dishes[currentDish];

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
  let nutrientData = dishes[currentDish];

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
    fat: "purple", // Added fat color
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
  let nutrientData = dishes[currentDish];

  // Loop through each nutrient to display its progress bar
  for (let nutrient in nutrientData) {
    let percentage = nutrientData[nutrient];
    let color = getColorForNutrient(nutrient); // Get the color for the current nutrient
    
    fill(220); // Background for the progress bar
    stroke(0);
    strokeWeight(2);
    rect(10, yOffset, 100, 15, 10); // Rounded corners for the background
    
    // Calculate the width for the progress bar
    let barWidth = map(percentage, 0, 100, 0, 100); // Map percentage to a range from 0 to 100 for width
    barWidth = constrain(barWidth, 0, 100); // Ensure the width stays within bounds (0 to 100)
    
    // Log to check the values for fat and other nutrients
    console.log(`${nutrient}: ${percentage}% - Width: ${barWidth}`);

    // Fill the bar with the nutrient's color
    fill(color); 
    noStroke();
    rect(10, yOffset, barWidth, 15, 10); // Draw the progress bar with the computed width
    
    fill(0); // Text color
    textAlign(LEFT, CENTER);
    text(nutrient, 120, yOffset + 8); // Display the nutrient name
    
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
    fat: "purple", // Added fat color
  };
  
  return colors[nutrient]; // Return the color based on nutrient
}
