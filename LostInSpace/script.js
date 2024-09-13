let gameState = {};
function preload() {
  // load in background and characters

  
  this.load.image({
    key: "bg",
    url: "https://cdn.glitch.global/6e8f8a36-7a20-4db6-9394-f24c7846b7d9/vecteezy_background-flatvector2-background_fr0121.jpg?v=1678019690155",
  });
  this.load.atlas(
    "tv",
    "https://cdn.glitch.global/6e8f8a36-7a20-4db6-9394-f24c7846b7d9/texture.png?v=1678908197260",
    "https://cdn.glitch.global/6e8f8a36-7a20-4db6-9394-f24c7846b7d9/texture.json?v=1678907182106"
  );
  this.load.image(
    "suits",
    "https://cdn.glitch.global/b45091bd-06ab-44dd-9f1a-650e8cffd522/Suits.png?v=1679003959027"
  );
  this.load.image(
    "all",
    "https://cdn.glitch.global/6e8f8a36-7a20-4db6-9394-f24c7846b7d9/All%2005%20Artboard%202%20Copy%204.png?v=1678890082819"
  );
  this.load.image(
    "bg2",
    "https://cdn.glitch.global/6e8f8a36-7a20-4db6-9394-f24c7846b7d9/Bg2.jpg?v=1678113528239"
  );
  this.load.image(
    "human",
    "https://cdn.glitch.global/6e8f8a36-7a20-4db6-9394-f24c7846b7d9/White%20%2001%20Artboard%202.png?v=1678821849076"
  );
  this.load.image(
    "dog",
    "https://cdn.glitch.global/6e8f8a36-7a20-4db6-9394-f24c7846b7d9/Dog.png?v=1678840336715"
  );

  this.load.image(
    "jellyfish",
    "https://cdn.glitch.global/6e8f8a36-7a20-4db6-9394-f24c7846b7d9/Characters%2003%20Artboard%202%20Copy%202.png?v=1678889219184"
  );
  this.load.audio("bgmusic", [
    "https://cdn.glitch.global/6e8f8a36-7a20-4db6-9394-f24c7846b7d9/funkyelement.mp3?v=1678483837639",
  ]);
  this.load.audio("buttonSound", [
    "https://cdn.glitch.global/6e8f8a36-7a20-4db6-9394-f24c7846b7d9/buttonSound.mp3?v=1678492927110",
  ]);
}
function create() {
  // play music
  this.sound.play("bgmusic", {
    loop: true,
  });

  // create start button
  const startButton = this.add.graphics();
  startButton.fillStyle(0x1f1641, 1);
  startButton.fillRoundedRect(
    this.cameras.main.centerX - 100, // x position
    this.cameras.main.centerY - 30, // y position
    200, // width
    60, // height
    10 // corner radius
  );

  startButton.setInteractive(
    new Phaser.Geom.Rectangle(
      this.cameras.main.centerX - 100, // x position
      this.cameras.main.centerY - 30, // y position
      200, // width
      60 // height
    ),
    Phaser.Geom.Rectangle.Contains
  );

  const buttonText = this.add.text(
    this.cameras.main.centerX,
    this.cameras.main.centerY,
    "Start the game",
    {
      fontFamily: "Arial",
      fontSize: "24px",
      color: "#ffffff",
      align: "center",
    }
  );

  buttonText.setOrigin(0.5);
  buttonText.setInteractive();

  buttonText.on("pointerdown", () => {
    this.sound.play("buttonSound"); // play sound
    initializePage(this);
    const firstPage = fetchPage(1);
    displayPage(this, firstPage);
    startButton.destroy();
    buttonText.destroy();
  });
}

//BACKGROUND RENDER+CHANGE+SAVE
function renderBackground(scene, key, scale, x, y) {
  if (key) {
    gameState.selectedBackground = key;
  } else {
    key = gameState.selectedBackground;
  }

  if (gameState.background) {
    gameState.background.destroy();
  }

  gameState.background = scene.add.image(x, y, key);
  gameState.background.setOrigin(0, 0);
  gameState.background.setDepth(-1000);

  // Set the scale of the background image based on the key
  if (key === "bg") {
    gameState.background.setScale(scale || 0.35);
  } else if (key === "bg2") {
    gameState.background.setScale(scale || 0.2);
    gameState.background.x = x || -650;
    gameState.background.y = y || -160;
  }
}


//CHARACTER2 RENDER+CHANGE+SAVE
function renderCharacter2(scene, key) {
  // Define the animation frames
  const frames = [
    { key: "tv", frame: "3D829513-4F73-4243-A2D6-F27C9B108172.png" }, //empty
    { key: "tv", frame: "D2769888-022C-4A31-88F7-5E6D65A35EC6.png" }, //info2
    { key: "tv", frame: "603F4D7E-EE6E-407A-8A3E-A2886F9BF850.png" }, //password
    { key: "tv", frame: "3D829513-4F73-4243-A2D6-F27C9B108172.png" }, //empty
    { key: "tv", frame: "0114DA70-F22A-4C7B-AA77-82A73686C714.png" }, //accepted
    { key: "tv", frame: "3D829513-4F73-4243-A2D6-F27C9B108172.png" }, //empty
    { key: "tv", frame: "B8C1F19F-F25F-4BD2-B5E8-C35569273D0B.png" }, //type
    { key: "tv", frame: "020B31A6-10B6-4C06-A88C-3DD22B37BD8A.png" }, //picture
    { key: "tv", frame: "B8AD542D-EA9D-4718-8BEB-B88D0FCB0071.png" }, //info
    { key: "tv", frame: "ECD96DEA-5EA1-4060-8993-B79C06F5722D.png" }, //info2
    { key: "tv", frame: "F2FB8BCC-B199-4A57-B147-E3B845ABDADB.png" }, //info3
    { key: "tv", frame: "F2FB8BCC-B199-4A57-B147-E3B845ABDADB.png" }, //info3
    { key: "tv", frame: "5DACE78F-B5D5-4E92-B1C4-FF371A8B5812.png" }, //error
    { key: "tv", frame: "5DACE78F-B5D5-4E92-B1C4-FF371A8B5812.png" }, //error
    { key: "tv", frame: "3D829513-4F73-4243-A2D6-F27C9B108172.png" }, //empty
  ];

  // Create the animation using the frames
  const anim = scene.anims.create({
    key: "tv_animation",
    frames: frames,
    frameRate: 1,
    repeat: 0, // Set to -1 to loop indefinitely
  });

  // hide character2 if no new key is given on a following page
  if (!key) {
    if (gameState.character2) {
      gameState.character2.destroy();
      delete gameState.character2;
    }
    return;
  }

  if (key) {
    gameState.selectedCharacter2 = key;
    gameState.character2 = scene.add.sprite(400, 200, key);
    gameState.character2.setScale(0.3);
    if (key == "tv") {
      gameState.character2.setScale(0.7);
      gameState.character2.anims.play("tv_animation");
    }
  }
}

//CHARACTER RENDER+CHANGE+SAVE
function renderCharacter(scene, key) {
  if (key) {
    gameState.selectedCharacter = key;
  } else {
    key = gameState.selectedCharacter;
  }

  if (gameState.character) {
    gameState.character.destroy();
  }

  gameState.character = scene.add.image(400, 350, key);
  gameState.character.setOrigin(0.5, 1);
  gameState.character.setScale(0.4);

  // Add wiggle animation
  scene.tweens.add({
    targets: gameState.character,
    x: "-=10",
    yoyo: true,
    repeat: -1,
    duration: 1000,
    ease: "Sine.easeInOut",
  });

  // Add rotation animation
  scene.tweens.add({
    targets: gameState.character,
    angle: "+=5",
    yoyo: true,
    repeat: -1,
    duration: 1500,
    ease: "Sine.easeInOut",
  });
}

function initializePage(scene) {
  // create options list and background
  // and saves them into gameState

  if (!gameState.options) {
    // create options list
    // if it doesn't exist
    gameState.options = [];
  }

  if (!gameState.narrative_background) {
    // create narrative background
    // if it doesn't exist
    gameState.narrative_background = scene.add.rectangle(
      200,
      360,
      430,
      170,
      0x1f1642
    );
    gameState.narrative_background.setOrigin(0, 0);
  }
}
function destroyPage() {
  // wipe out narrative text and options
  if (gameState.narrative) {
    // destroy narrative if it exists
    gameState.narrative.destroy();
    // set gameState.narrative to undefined
    gameState.narrative = undefined;
  }

  if (gameState.timer) {
    // remove timer if it exists
    gameState.timer.remove();
    // set gameState.timer to undefined
    gameState.timer = undefined;
  }
  for (let option of gameState.options) {
    // destroy options if they exist
    option.optionBox.destroy();
    option.optionText.destroy();
  }
  // empty gameState.options array
  gameState.options = [];
}

function displayPage(scene, page) {
  renderCharacter(scene, page.character);
  renderBackground(scene, page.background);
  renderCharacter2(scene, page.character2);

  // destroy current page before rendering new one
  destroyPage();

  // create the timer object and store it in gameState
  gameState.timer = scene.time.addEvent({
    delay: 50,
    repeat: page.narrative.length - 1,
    callback: function () {
      gameState.narrative.text +=
        page.narrative[
          page.narrative.length - 1 - gameState.timer.getRepeatCount()
        ];
    },
    onComplete: function () {
      gameState.timer = undefined;
    },
  });

  const narrativeStyle = {
    fill: "#ffffff",
    fontStyle: "italic",
    align: "center",
    wordWrap: { width: 340 },
    lineSpacing: 8,
  };

  gameState.narrative = scene.add.text(250, 380, "", narrativeStyle);

  for (let i = 0; i < page.options.length; i++) {
    let option = page.options[i];

    const optionBox = scene.add.rectangle(
      240 + i * 130,
      475,
      110,
      40,
      0xb39c0e,
      0
    );
    optionBox.strokeColor = 9545102;
    optionBox.strokeWeight = 4;
    optionBox.strokeAlpha = 1;
    optionBox.isStroked = true;
    optionBox.setOrigin(0, 0);

    const baseX = 190 + i * 130;
    const optionText = scene.add.text(baseX, 485, option.option, {
      fontSize: 14,
      fill: "#FFFFFF",
      align: "center",
      wordWrap: { width: 110 },
    });
    const optionTextBounds = optionText.getBounds();

    optionText.setX(optionTextBounds.x + 105 - optionTextBounds.width / 2);
    optionText.setY(optionTextBounds.y + 10 - optionTextBounds.height / 2);

    optionBox.setInteractive();
    optionBox.on(
      "pointerup",
      function () {
        const newPage = this.option.nextPage;
        if (newPage !== undefined) {
          destroyPage();
          displayPage(scene, fetchPage(newPage));
        }
      },
      { option }
    );

    optionBox.on(
      "pointover",
      function () {
        this.sound.play("buttonSound"); // play sound
        this.optionBox.setStrokeStyle(2, 0xffe014, 1);
        this.optionText.setColor("#ffe014");
      },
      { optionBox, optionText }
    );

    optionBox.on(
      "pointerout",
      function () {
        this.optionBox.setStrokeStyle(1, 0xb38c03, 1);
        this.optionText.setColor("#b39c0e");
      },
      { optionBox, optionText }
    );

    gameState.options.push({
      optionBox,
      optionText,
    });
  }
}

const config = {
  type: Phaser.WEBGL,
  parent: "phaser-game",
  backgroundColor: "0b3373",
  width: 820,
  height: 550,
  scene: {
    preload,
    create,
  },
};

const game = new Phaser.Game(config);
function fetchPage(page) {
  const pages = [
    {
      background: "bg",
      character: "all",
      page: 1,
      narrative: "Choose your character:",
      options: [
        { option: "human", nextPage: 2 },
        { option: "dog", nextPage: 3 },
        { option: "jellyfish", nextPage: 4 },
      ],
    },
    {
      page: 2,
      background: "bg2",
      character: "human",
      narrative: "Halo?! Halo?! Can anybody hear me?",
      options: [
        { option: "Say Hi.", nextPage: 6 },
        { option: "Ignore.", nextPage: 5 },
      ],
    },

    {
      page: 3,
      character: "dog",
      background: "bg2",
      narrative: "Woof!Woof!",
      options: [
        { option: "Hi?", nextPage: 6 },
        { option: "Ignore", nextPage: 5 },
      ],
    },

    {
      page: 4,
      background: "bg2",
      character: "jellyfish",
      narrative: "Gee-gee.",
      options: [
        { option: "Hi?", nextPage: 6 },
        { option: "Ignore", nextPage: 5 },
      ],
    },

    {
      page: 5,
      narrative: "?!?!?!?!",
      options: [{ option: "Continue ignoring.", nextPage: 99 }],
    },
    {
      page: 6,
      narrative: "Halo? Oh what a blessing! Hello!",
      options: [{ option: "?", nextPage: 7 }],
    },
    {
      page: 7,
      narrative:
        "I am stuck in the space! And my monitor broke! I have only access to radio! Please help me!",
      options: [{ option: "What happened?", nextPage: 8 }],
    },
    {
      page: 8,
      narrative:
        "Its my first mission in the space and I have made a terrible mistake! I have forgotten to pack my space data log! ",
      options: [{ option: "Nod", nextPage: 9 }],
    },

    {
      page: 9,
      narrative:
        "If my boss will have to call emergency aircraft to help me, I will be in big trouble!",
      options: [{ option: "How can I help?", nextPage: 10 }],
    },

    {
      page: 10,
      narrative:
        "I need you to access the planet data and guide me through Solar System.",
      options: [{ option: "How do I start?", nextPage: 11 }],
    },
    {
      page: 11,
      narrative:
        "Open the computer in front of you. The password is the name of our home planet.",
      options: [{ option: "Switch on computer.", nextPage: 12 }],
    },

    {
      page: 12,
      character2: "tv",
      narrative: "Computer screen",
      options: [{ option: "...", nextPage: 13 }],
    },
    {
      page: 13,
      narrative: "Can you see the data? ",
      options: [{ option: "It crashed!", nextPage: 14 }],
    },
    {
      page: 14,
      narrative: "Oh no. Now I'm gonna loose my job for sure! ",
      options: [{ option: "Don't worry!", nextPage: 15 }],
    },

    {
      page: 15,
      narrative: "Can you remember any information?",
      options: [
        { option: "I think so...", nextPage: 19 },
        { option: "Yes!", nextPage: 19 },
        { option: "We can try.", nextPage: 19 },
      ],
    },

    {
      page: 19,
      narrative:
        "The ship has landed. You arrived to Mars. Please departure now.",
      options: [{ option: "..", nextPage: 20 }],
    },

    {
      page: 20,
      narrative: "It's the time! Please do your best!",
      options: [{ option: "nod", nextPage: 21 }],
    },
    {
      page: 21,
      narrative:
        "What should I wear to go outside? It seems to be the middle of the day.",
      character2: "suits",
      options: [
        { option: "Thermal suit.", nextPage: 98 },
        { option: "Cooling suit.", nextPage: 22 },
      ],
    },

    {
      page: 22,
      narrative:
        "That seems to be a good choice. Do I need extra protection from UV lights here? ",
      options: [
        { option: "Yes! Eat 10 carrots.", nextPage: 98 },
        { option: "Yes! Use a gold visor.", nextPage: 23 },
        { option: "Nah.You good.", nextPage: 98 },
      ],
    },

    {
      page: 23,
      narrative: "Great!. Will I will be able to walk on the surface? ",
      options: [
        { option: "Yes!", nextPage: 24 },
        { option: "No. You need a jepack.", nextPage: 98 },
      ],
    },

    {
      page: 24,
      narrative:
        "Good job! We are ready to go out of the spaceship now! Mars is ours to discover. !!This conludes the alpha version of the game, thank you!!",
      options: [{ option: "Start again!", nextPage: 1 }],
    },
    {
      page: 98,
      narrative: "Bad choice... Game over.",
      options: [{ option: "Start again", nextPage: 1 }],
    },
    {
      page: 99,
      narrative: "That's not very nice of you... Game over.",
      options: [{ option: "Start again", nextPage: 1 }],
    },
  ];

  return pages.find(function (e) {
    if (e.page == page) return e;
  });
}
