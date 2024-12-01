
// You can write more code here

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

		// asset_8
		const asset_8 = this.add.image(656, 368, "Asset 8");
		asset_8.scaleX = 0.8029926016704788;
		asset_8.scaleY = 0.8029926016704788;

		// welcome
		const welcome = this.add.text(656, 272, "", {});
		welcome.scaleX = 0.9774028217503797;
		welcome.setOrigin(0.5, 0.5);
		welcome.text = "Food \nCrimes\n";
		welcome.setStyle({ "align": "center", "baselineX": 0, "color": "#000000ff", "fontFamily": "Pixelify Sans", "fontSize": "85px", "shadow.offsetX": 10, "shadow.offsetY": 10, "shadow.blur": 15, "shadow.fill": true });
		welcome.setPadding({"left":10,"right":20});

		// asset_6
		const cat = this.add.image(144, 416, "Asset 6");
		cat.scaleX = 0.8588758273543489;
		cat.scaleY = 0.8588758273543489;
		const catWidth = cat.width * cat.scaleX;
		const catHeight = cat.height * cat.scaleY;

		cat.setInteractive(new Phaser.Geom.Rectangle(0, 0, catWidth, catHeight), Phaser.Geom.Rectangle.Contains);

		this.welcome = welcome;
		this.cat = cat;
		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Text} */
	welcome;

	/* START-USER-CODE */

	// Write more your code here

	create() {

		this.editorCreate();

		this.cat.on("pointerdown", () => {
			this.welcome.text = "Ready\n?";

		}
		);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
