// WorkFlow
let socket;
let myData = []; 

var table, input;

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

socket = io();

function preload() {
  // loadJSON('data.json', function(data) {
  //   myData = data;
  // });

  table = loadTable('food.csv', 'csv', 'header');

  //img = loadImage("fruit.jpg");
  //img = loadImage("fruit-v2.jpg");
  // img = loadImage("kiko.jpg");
  //img = loadImage("friedchicken.jpg");
  img = loadImage("fruit-v5.jpg");
  
  
}



function setup() {
  //createCanvas(img.width, img.height);
  createCanvas(windowWidth, windowHeight);

  // print(table.get(1, 0));

  //socket = io.connect('http://localhost:5500')
  socket.on('ingredient', newMsg);


  // select = createSelect();
  // button = createButton("insert");

  // for (let i = 0; i < table.getRowCount(); i++) {
  //   select.option(table.get(i, 0));
  //   // ingredients.push(myData[i][1]);
  //   carbon.push(table.get(i, 1));
  //   water.push(table.get(i, 2));
  // }

  function newMsg(data) {
    // console.log(data);
  //  input = String(data).toLowerCase();
  input = String(data).toLowerCase();
    print(String(data).toLowerCase());
 
  //  print(input.toLowerCase());
  }

  // print(String(input).toLowerCase());
  // input.changed(selector());
  

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



function draw() {
  background(0);
  // button.mousePressed(sChanged);

 
  let randomPicker = random(dots);
 
  showDots.push(randomPicker);
  for (i = showDots.length - 1; i >= 0; i--) {
    showDots[i].draw();
    showDots[i].animate();
  }

  selector();
  // print(input);
}


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
  // picker = carbon[ingredients.indexOf(select.value())] + water[ingredients.indexOf(select.value())];
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


function selector() {
  picker = 0;
  

 
  for (let i = 0; i < table.getRowCount(); i++) {
    let checker = table.get(i, 0).toString().toLowerCase();
    // print(seer);
    if (input == checker) {
      
      picker = round(table.get(i, 1)) + round(table.get(i, 2));
      

      for (let i = 0; i <= picker; i++) {
        let randomRemover = random(showDots);
        let d = new dot(randomRemover.x, randomRemover.y);
        showDots.splice(randomRemover, 1);
    
        showDots.push(d);
        
      }
      print(picker);
      picker = 0;
      input = null;
    } 
    
  }


}