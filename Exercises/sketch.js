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
let iconSalt, iconFibre, iconProtein, iconsugars, iconFat;

function preload() {
  iconSalt = loadImage('images/salt.png');
  iconFibre = loadImage('images/fibre.png');
  iconProtein = loadImage('images/protein.png');
  iconsugars = loadImage('images/sugar.png');
  iconFat = loadImage('images/fat.png');
}

let currentDish = "Margherita Pizza"; // Default dish
let fallingObjects = [];
let canvasWidth = 800; // Increased width
let canvasHeight = 800; 

let squareBounds = {
  x: canvasWidth / 2, // Move it more to the right
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
  dropdown.position(350, 80); // Center the dropdown horizontally
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
  text("Choose product:", 195, 84); // Adjusted y-position

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
  let yOffset = 250 + (Object.keys(dishes[currentDish]).length * 20); // Set yOffset directly below the last individual bar
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
    salt: "#A7C6ED",
    fibre: "#A7D7A9",
    protein: "#B79B6D",
    sugars: "#F7C5D1",
    fat: "#F9E076", 
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
  let xOffset = 40; // Starting position for the bars and icons to shift them to the right
  let nutrientData = dishes[currentDish];

  // Loop through each nutrient to display its progress bar
  for (let nutrient in nutrientData) {
    // Debugging: Log the nutrient values to understand their range
    console.log(`Nutrient: ${nutrient}, Value: ${nutrientData[nutrient]}`);
    
    // Assuming 100 is the maximum value for each nutrient (you can adjust this based on expected ranges)
    let normalizedPercentage = map(nutrientData[nutrient], 0, 100, 0, 100);
    
    // Ensure the percentage is bounded between 0 and 100
    normalizedPercentage = constrain(normalizedPercentage, 0, 100);
    
    let color = getColorForNutrient(nutrient); // Get the color for the current nutrient
    
    let barHeight = 20; // Adjusted height for the bars
    let barWidth = 200; // Set the width of the progress bar
    
    fill(220); // Background for the progress bar
    stroke(150);
    strokeWeight(2);
    rect(xOffset, yOffset, barWidth, barHeight, 0, 10, 10, 0); // Rounded corners on the right side for the background bar
    
    // Map normalized percentage (0 to 100) to the progress bar width (0 to 200)
    let progressWidth = map(normalizedPercentage, 0, 100, 0, barWidth); // Correct the width of the progress bar
    let rectHeight = barHeight - 2;  // Reduced height of the rectangle
    let centralizeOffset = (barHeight - rectHeight) / 2;  // To center the rectangle within the bar
    
    // Now, draw the colored progress bar with rounded corners only on the right side
    fill(color); // Nutrient color
    noStroke();
    
    // Draw the colored progress bar with rounded corners on the right side
    rect(xOffset + 1, yOffset + centralizeOffset, progressWidth, rectHeight, 0, 10, 10, 0); // Draw with rounded corners only on the right side
    
    // Add icon to the left of the progress bar
    let icon;
    if (nutrient === "salt") icon = iconSalt;
    if (nutrient === "fibre") icon = iconFibre;
    if (nutrient === "protein") icon = iconProtein;
    if (nutrient === "sugars") icon = iconsugars;
    if (nutrient === "fat") icon = iconFat;
    
    image(icon, xOffset - 40, yOffset - 5, 30, 30); // Increase icon size to 30x30 and shift to the left
    
    // Display nutrient name to the right of the bar
    fill(0); // Text color
    textAlign(LEFT, CENTER);
    text(nutrient, xOffset + barWidth + 10, yOffset + barHeight / 2); // Display the nutrient name to the right of the bar
    
    yOffset += 40; // Move down for the next bar, adjust for larger height
  }
}




// Get the color associated with each nutrient
function getColorForNutrient(nutrient) {
  let colors = {
    salt: "#A7C6ED",
    fibre: "#A7D7A9",
    protein: "#B79B6D",
    sugars: "#F7C5D1",
    fat: "#F9E076", 
  };
  
  return colors[nutrient]; // Return the color based on nutrient
}
