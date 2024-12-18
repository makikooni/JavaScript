// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorPreload() {

		this.load.pack("asset-pack", "assets/asset-pack.json");
	}

	/** @returns {void} */
	editorCreate() {

		// asset_8
		const asset_8 = this.add.image(679, 435, "Asset 8");
		asset_8.scaleX = 0.6624465146777763;
		asset_8.scaleY = 0.6624465146777763;

		// progressBar
		const progressBar = this.add.rectangle(553, 361, 256, 20);
		progressBar.setOrigin(0, 0);
		progressBar.isFilled = true;
		progressBar.fillColor = 14737632;

		// progressBarBg
		const progressBarBg = this.add.rectangle(553.0120849609375, 361, 256, 20);
		progressBarBg.setOrigin(0, 0);
		progressBarBg.fillColor = 14737632;
		progressBarBg.isStroked = true;

		// loadingText
		const loadingText = this.add.text(552.0120849609375, 329, "", {});
		loadingText.text = "Loading...";
		loadingText.setStyle({ "color": "#000000ff", "fontFamily": "arial", "fontSize": "20px" });

		this.progressBar = progressBar;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Rectangle} */
	progressBar;

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();

		this.editorPreload();
		this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
		this.load.script('webfont', 'https://fonts.googleapis.com/css2?family=Zilla+Slab+Highlight:wght@400;700&display=swap');


		const width =  this.progressBar.width;

		this.load.on("progress", (progress) => {

			this.progressBar.width = progress * width;
		});
	}

	create() {
		  WebFont.load({
            google: {
                families: [ 'Pixelify Sans', 'Zilla Slab Highlight', 'Zilla Slab' ]
            }}
			);
		this.scene.start("Level");

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
