//grid based drawing tool
//install live server navigation 

/*
console.log("hi bitches");

let cat = "Meow";
let age = 7;
console.log(cat + " has " + age + " years");

function food_required(years,multiplier) {
    amount = years * multiplier;
    sentence = "The cat requires " + amount + " kg of food.";
    return sentence
};

answer = food_required(age,10);
console.log(answer);


for (var i=0; i<10; i++){
    console.log(i + " " + answer)
}

*/

let style = 'pink';

for (let i=0; i<50; i++){
    let unit = document.createElement('div');
    unit.classList.add(style);
    unit.addEventListener("click",function(){
        console.log("clicked");
        unit.classList.toggle('clicked');
    });
    document.body.appendChild(unit);

};
