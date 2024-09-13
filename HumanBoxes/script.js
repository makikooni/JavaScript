//these variables connect our code with the 'id' on the html
//we can then manipulate the variables and it will manipulate the html
var images = document.getElementById("images");
var text = document.getElementById("text");
var buttonBox = document.getElementById("buttonBox");
var input = document.getElementById("input");
var username;

//this is how after we type in the character name and hit enter
//we will add the name to the variable, remove the input box and start our first scenario
input.addEventListener('keyup', function(event) {
  if (event.key === 'Enter' || event.keyCode === 13) {
    username = input.value;
    input.parentNode.removeChild(input);
    advanceTo(scenario.two);
  }
});

//this changes the text and puts in your characters name
var changeText = function (words) {
  text.innerHTML = words.replace("name", username);
};

//this takes the image link and puts it in the proper format, sending it to the html
var changeImage = function (img) {
  images.style.backgroundImage = "url(" + img + ")";
};

//this looks at the number of options we have set and creates enough buttons
var changeButtons = function (buttonList) {
  buttonBox.innerHTML = "";
  for (var i = 0; i < buttonList.length; i++) {
    buttonBox.innerHTML +=
      "<button onClick=" +
      buttonList[i][1] +
      ">" +
      buttonList[i][0] +
      "</button>";
  }
};

//this is what moves the game along
var advanceTo = function (s) {
  changeImage(s.image);
  changeText(s.text);
  changeButtons(s.buttons);
};

//this is the object that holds each scenario, the more you add the more options there are

var scenario = {
  one: {
    text:
      "Welcome, welcome! <br> Let's find out what should you do with your body after death! <br>How would you like me to call you?\n",
  },

  two: {
    text:
      "Hi name. No reason to hide the truth here. Are you proud of your narcissism and your egoistic tendencies?",
    buttons: [
      ["Yes", "advanceTo(scenario.three)"],
      ["No", "advanceTo(scenario.five)"],
      ["I am not egoistic.", "advanceTo(scenario.eight)"]
    ]
  },
  three: {
    text:
      "Do you, name,  believe that your death was a mistake? <br> Are you SO important that you should stay in this world forever? ",
    buttons: [
      ["Yes.", "advanceTo(scenario.four)"],
      ["No", "advanceTo(scenario.thirteen)"]
    ]
  },
  four: {
    text:
      "You never had to worry about finances, didn't ya? Gotta unlimited cash to spend?",
    buttons: [
      ["Yes", "advanceTo(scenario.cryonics)"],
      ["No", "advanceTo(scenario.plast)"]
    ]
  },
  five: {
    text: "Do you care about your impact on the environment?",
    buttons: [
      ["Yes", "advanceTo(scenario.six)"],
      ["No", "advanceTo(scenario.thirteen)"]
    ]
  },

  six: {
    text: "Animals or plants?",
    buttons: [
      ["Animals", "advanceTo(scenario.seven)"],
      ["Plants", "advanceTo(scenario.eighteen)"]
    ]
  },

  seven: {
    text:
      "Would you like to help animals stay alive a bit longer? (in comparison to you)",
    buttons: [
      ["Yes", "advanceTo(scenario.sky)"],
      ["No", "advanceTo(scenario.mushroom)"]
    ]
  },

  eight: {
    text: "Yeah, sure. Nobody is.",
    buttons: [["...", "advanceTo(scenario.nine)"]]
  },

  nine: {
    text: "People or animals?",
    buttons: [
      ["People", "advanceTo(scenario.ten)"],
      ["Animals", "advanceTo(scenario.seven)"]
    ]
  },

  ten: {
    text: "Do you still feel the need to be useful?",
    buttons: [
      ["Yes", "advanceTo(scenario.eleven)"],
      ["No", "advanceTo(scenario.sixteen)"]
    ]
  },

  eleven: {
    text: "Is education of the future generations important to you?",
    buttons: [
      ["Yes", "advanceTo(scenario.twelve)"],
      ["No", "advanceTo(scenario.seventeen)"]
    ]
  },

  twelve: {
    text:
      "Never managed to finish a medical degree, but still want to make your family proud?",
    buttons: [
      ["Yes", "advanceTo(scenario.science)"],
      ["No", "advanceTo(scenario.plast)"]
    ]
  },

  thirteen: {
    text: "Do you work out?",
    buttons: [
      ["Yes", "advanceTo(scenario.fourteen)"],
      ["No", "advanceTo(scenario.fifteen)"]
    ]
  },

  fourteen: {
    text: "Wanna stay in shape forever?",
    buttons: [
      ["Yes", "advanceTo(scenario.plast)"],
      ["No", "advanceTo(scenario.crem)"],
      ["I don't care.", "advanceTo(scenario.ground)"]
    ]
  },

  fifteen: {
    text: "Do you want to have a hot body?",
    buttons: [
      ["Yes", "advanceTo(scenario.crem)"],
      ["No", "advanceTo(scenario.ten)"]
    ]
  },

  sixteen: {
    text: "Scared of standing out from the crowd?",
    buttons: [
      ["Yes", "advanceTo(scenario.ground)"],
      ["No", "advanceTo(scenario.sky)"]
    ]
  },

  seventeen: {
    text: "Do you care about the environment?",
    buttons: [
      ["Yes", "advanceTo(scenario.comp)"],
      ["No", "advanceTo(scenario.sixteen)"]
    ]
  },

  eighteen: {
    text: "Did you dream about becoming a sailor? Or a mermaid perhaps?",
    buttons: [
      ["Yes", "advanceTo(scenario.reef)"],
      ["No", "advanceTo(scenario.tree)"]
    ]
  },

  tree: {
    image: "https://i.ibb.co/ctWdtms/IMG-1813.png",
    text:
      "You can still grow! Not intellectually or personally though. Become one with the nature by using your leftovers to grow a new tree!"
  },

  mushroom: {
    image: "https://i.ibb.co/x8QPcJt/IMG-1818.jpg",
    text:
      "Since you don't feel like being eaten, what about a modern version of a coffin? You still will rest respectfully, but also won't harm the environment that much."
  },

  ground: {
    image: "https://i.ibb.co/LNVrWKn/IMG-6923.jpg",
    text:
      "Welcome to our big freezer! We will do our best to keep you fresh for the unforseeble future. Maybe even, one day you will wake up in this perfect brave new world. Or not. The chances are like one in billion, but why not to try? "
  },

  reef: {
    image: "https://i.ibb.co/xqbrKN4/IMG-1824.png",
    text:
      "Hey, you will not only help the environment but you will also look pretty cool, when the corals grow over you."
  },

  comp: {
    image: "https://i.ibb.co/kKmrLbb/IMG-1492.png",
    text:
      "You can still be useful. Let's make a compost out of you,name. Your corpses can actually make a pretty rich soil."
  },

  cryonics: {
    image: "https://i.ibb.co/7rF82Hr/IMG-1817.jpg",
    text:
      "Welcome to our big freezer! We will do our best to keep you fresh for the unforseeble future. Maybe even, one day you will wake up in this perfect brave new world. Or not. The chances are like one in billion, but why not to try?"
  },

  crem: {
    image: "https://i.ibb.co/ypwB49n/IMG-1823.jpg",
    text:
      "Hot, hot! Your body will no longer take any space. Almost. All we have left are the ashes. "
  },

  sky: {
    image: "https://i.ibb.co/1QVtmzv/IMG-1816.jpg",
    text:
      "There's no better way of taking care of someone than simply feeding them! Let's SPICE YOU UP a bit to make sure you will taste yummy. We will leave you outside in nature, to allow the wild animals get some nutritients. Thank you for taking care of our best friends."
  },

  science: {
    image: "https://i.ibb.co/5nmtkDM/IMG-1840.jpg",
    text:
      "We tremendously appreciate your donation to the science and research world. Your remains will play an important part in study of future medicines and treatments. Maybe even thanks to you, we will be finally able to cure cancer! Or maybe some first year pre-med student will just cut you open to see what's inside. Anyway, thanks!"
  },

  plast: {
    image: "https://i.ibb.co/r5v6DMn/IMG-1778.png",
    text:
      "Certainly you feel the need to leave the mark on the world. Don't wanna leave yet? Easy peasy. Let's make a doll out of you, name."
  }
};

//this is the code that starts the game
advanceTo(scenario.one);

