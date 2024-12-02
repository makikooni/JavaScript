// Variables
var catCounter = 0
const HINT_DELAY = 3000; // Delay for hints in ms
/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		const background = this.add.image(640, 352, "background");
		background.scaleX = 0.668800598067051;
		background.scaleY = 0.6718093961757252;

		// computer
		const computer = this.add.image(656, 368, "Asset 8");
		computer.scaleX = 0.8029926016704788;
		computer.scaleY = 0.8029926016704788;

		// welcome
		const welcome = this.add.text(656, 272, "", {});
		welcome.scaleX = 0.9774028217503797;
		welcome.setOrigin(0.5, 0.5);
		welcome.text = "Food \nCrimes\n";
		welcome.setStyle({ "align": "center", "baselineX": 0, "color": "#000000ff", "fontFamily": "Pixelify Sans", "fontSize": "85px", "shadow.offsetX": 10, "shadow.offsetY": 10, "shadow.blur": 15, "shadow.fill": true });
		welcome.setPadding({"left":10,"right":20});

		// cat
		const cat = this.add.image(160, 464, "cat");
		cat.setInteractive(new Phaser.Geom.Rectangle(0, 0, 628, 627), Phaser.Geom.Rectangle.Contains);
		cat.scaleX = 0.6369282006437108;
		cat.scaleY = 0.6369282006437108;

		// hint01
		const hint01 = this.add.text(944, 128, "", {});
		hint01.setStyle({ "color": "#000000ff", "fontFamily": "Zilla Slab Highlight", "fontSize": "70px", "stroke": "#000000ff" });

		// switchButton
		const switchButton = this.add.ellipse(912, 512, 128, 128);
		switchButton.setInteractive(new Phaser.Geom.Rectangle(0, 0, 128, 128), Phaser.Geom.Rectangle.Contains);
		switchButton.scaleX = -0.2875161165813452;
		switchButton.scaleY = 0.32771283458160994;
		switchButton.lineWidth = 0;

		// hint00
		const hint00 = this.add.text(128, 272, "", {});
		hint00.angle = -15;
		hint00.text = "";
		hint00.setStyle({ "color": "#000000ff", "fontFamily": "Zilla Slab Highlight", "fontSize": "20px" });

		this.background = background;
		this.computer = computer;
		this.welcome = welcome;
		this.cat = cat;
		this.hint01 = hint01;
		this.switchButton = switchButton;
		this.hint00 = hint00;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	background;
	/** @type {Phaser.GameObjects.Image} */
	computer;
	/** @type {Phaser.GameObjects.Text} */
	welcome;
	/** @type {Phaser.GameObjects.Image} */
	cat;
	/** @type {Phaser.GameObjects.Text} */
	hint01;
	/** @type {Phaser.GameObjects.Ellipse} */
	switchButton;
	/** @type {Phaser.GameObjects.Text} */
	hint00;

	/* START-USER-CODE */

	// Write more your code here

	

	create() {
		// Initialize the scene
		this.editorCreate();

		// Set up interactivity for the cat
		this.cat.on("pointerdown", this.handleCatClick, this);

		// Set up interactivity for the switch button
		this.switchButton.on("pointerdown", this.handleSwitchButtonClick, this);
	}

	handleCatClick() {
		catCounter += 1;
		if (catCounter === 1) {
			this.welcome.text = "Ready\n?";
			this.hint00.destroy();
		}
	}

	handleSwitchButtonClick() {
		console.log("button clicked");

		this.welcome.text = "";
		this.scaleObjects([this.background, this.computer], 0.45); // Zoom in on objects
		this.adjustComputerPosition();
		this.removeObjects([this.cat, this.hint01, this.switchButton]);
	}

	scaleObjects(objects, scaleFactor) {
		objects.forEach(object => {
			object.scaleX += scaleFactor;
			object.scaleY += scaleFactor;
		});
	}

	adjustComputerPosition() {
		this.computer.y += 100;
	}

	removeObjects(objects) {
		objects.forEach(object => {
			object.destroy();
		});
	}

	handleHintTimerStarted(hintText, hintObject) {
		this.time.delayedCall(HINT_DELAY, () => {
			hintObject.text = hintText;
		});
	}

	update() {
		if (!this.hint00TimerStarted) {
			this.hint00TimerStarted = true;
			this.handleHintTimerStarted("Meow", this.hint00);
		}

		if (catCounter >= 2 && !this.hint01TimerStarted) {
			this.hint01TimerStarted = true;
			this.welcome.text = ""; // Clear the welcome text
			this.handleHintTimerStarted("How do I \nswitch it \non...\n", this.hint01);
		}
	}
}