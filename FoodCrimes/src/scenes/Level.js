var catCounter = 0; // Keeps track of cat clicks
const HINT_DELAY = 3000; // Delay for hints in ms

export default class Level extends Phaser.Scene {
	constructor() {
		super("Level");
		this.processing = false; // Prevent overlapping interactions
	}

	create() {
		// Background
		const background = this.add.image(640, 352, "background");
		background.setScale(0.67);

		// Computer
		const computer = this.add.image(656, 368, "Asset 8");
		computer.setScale(0.8);

		// Welcome Text
		this.welcome = this.add.text(656, 272, "Food \nCrimes\n", {
			align: "center",
			color: "#000000ff",
			fontFamily: "Pixelify Sans",
			fontSize: "85px",
			shadow: { offsetX: 10, offsetY: 10, blur: 15, fill: true },
		}).setOrigin(0.5);

		// Cat
		this.cat = this.add.image(160, 464, "cat").setInteractive();
		this.cat.setScale(0.64);

		// Hints
		this.hint00 = this.add.text(128, 272, "", {
			color: "#000000ff",
			fontFamily: "Zilla Slab Highlight",
			fontSize: "20px",
		}).setAngle(-15);

		this.hint01 = this.add.text(944, 128, "", {
			color: "#000000ff",
			fontFamily: "Zilla Slab Highlight",
			fontSize: "70px",
		});

		// Switch Button
		this.switchButton = this.add.ellipse(912, 512, 128, 128).setInteractive();

		// Event Listeners
		this.cat.on("pointerdown", () => this.handleCatClick());
		this.switchButton.on("pointerdown", () => this.handleSwitchButtonClick());
	}

	handleCatClick() {
		// Prevent rapid clicks
		if (this.processing) return;
		this.processing = true;

		catCounter += 1;

		if (catCounter === 1) {
			this.welcome.setText("Ready?");
			this.time.delayedCall(HINT_DELAY, () => {
				if (this.welcome) this.welcome.destroy();
				this.processing = false; // Reset interaction
			});
		} else if (catCounter === 2) {
			this.hint01.setText("How do I \nswitch it \non...\n");
			this.processing = false;
		}
	}

	handleSwitchButtonClick() {
		// Prevent multiple clicks
		if (this.processing) return;
		this.processing = true;

		// Scale objects
		this.background?.setScale(1.1);
		this.computer?.setScale(1.1);

		// Remove objects
		this.cat?.destroy();
		this.hint00?.destroy();
		this.hint01?.destroy();
		this.switchButton?.destroy();

		// End processing
		this.processing = false;
	}
}
