//const { text } = require("express");


// WorkFlow
let socket;
let myData = []; 
let ingredients = [];
let carbon = [];
let water = [];

let dots = [];
let showDots = [];

let select, picker;
let button;
let remover;

let img;
var size = 10;

function preload() {
  loadJSON('data.json', function(data) {
    myData = data;
  });

  img = loadImage("friedchicken.jpg");
  // img = loadImage("kiko.jpg");
}



function setup() {
  createCanvas(img.width, img.height);

socket = io.connect('http://localhost:5000')

   //socket.on(input, newInput);


  select = createSelect();
  button = createButton("insert");

  for (let i = 0; i < myData.length; i++) {
    select.option(myData[i][1]);
    ingredients.push(myData[i][1]);
    carbon.push(myData[i][2]);
    water.push(myData[i][3]);
  }



  //select.changed(sChanged);
  

  image(img, 0, 0, img.width, img.height);
  loadPixels();
  noStroke();
  background(0);

 
  
  for(var x = 0; x < width; x += size) {
    for(var y = 0; y < height; y += size) {
      let d = new dot(x, y);
      dots.push(d);
    }
  }

}


//from sockets?
function newInput(data) {
  text(input, 100, 100)
}

function draw() {
  background(0);
  button.mousePressed(sChanged);
  //select.changed(selectChanged);

  //console.log(ingredients.indexOf(select.value()));
  //console.log(carbon[ingredients.indexOf(select.value())]);

  //ellipse(width/2, height/2, carbon[ingredients.indexOf(select.value())] * 3, water[ingredients.indexOf(select.value())] * 3)


  //print(select.value());

 
  
  // print(showDots.length);

  let txt = select.value();
  text(txt);
  
  let randomPicker = random(dots);
 
  showDots.push(randomPicker);
  for (i = showDots.length - 1; i >= 0; i--) {
    showDots[i].draw();
    showDots[i].animate();
  }

  //print(showDots);
}

// function dotter(x, y) {
//     var index = (x + (y * width)) * 4;
//     var r = pixels[index];
//     var g = pixels[index+1];
//     var b = pixels[index+2];
//     var a = pixels[index+3]; // CHANGE TO LERP IN;
//     var col = color(r, g, b, a);
//     var light = lightness(col);
//     var radius = map(light, 0, 100, size, 3);
    
//     fill(r, g, b, a);
//     ellipse(x, y, radius);
// }

class dot {
  constructor(x ,y) {
    this.x = x;
    this.y = y;
    this.index = (x + (y * width)) * 4;

    this.r = pixels[this.index];
    this.g = pixels[this.index+1];
    this.b = pixels[this.index+2];
    this.a = 0;

    this.col = color(this.r, this.g, this.b, this.a);
    this.light = lightness(this.col);
    this.radius = map(this.light, 0, 100, size, 3);
    this.fade = 0.01;
  }

  draw() {
    fill(this.r, this.g, this.b, this.a);
    // ellipse(this.x, this.y, this.radius);
    rect(this.x, this.y, size);
  }

  animate() {
    this.a = lerp(this.a, pixels[this.index], this.fade);
  }
}

function sChanged() {
  picker = carbon[ingredients.indexOf(select.value())] + water[ingredients.indexOf(select.value())];
  // picker = 1;
  

  for (let i = 0; i < picker; i++) {
    let randomRemover = random(showDots);
    let d = new dot(randomRemover.x, randomRemover.y);
    showDots.splice(randomRemover, 1);

    showDots.push(d);
  }



  // picker = carbon[2];
  // picker = myData[2][3];

}

function selectChanged() {
  switch (select.value()) {
    case "Beef":
      circle(10, 10, 10);
      break;
    case "Coffee":
      text("serif");
      break;
    case "Pork":
      text("fantasy");
      break;
    case "Chicken":
      text("fantasy");
      break;
    case "Eggs":
      text("fantasy");
      break;
  }

}