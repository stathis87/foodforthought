// WorkFlow
let socket;
let myData = [];

var table, input;

let ingredients = [];
let carbon = [];
let water = [];

let dots = [];
let showDots = [];
let squares = [];

let select, picker;
let button;
let remover;

let img;
var size = 10;

socket = io(); 

function preload() {
  table = loadTable("food.csv", "csv", "header");
  img = loadImage("fruit-v3.jpg"); // for other image replace the jpg
}

function setup() {
  //Comment the window hight and width for having image width and height
  //createCanvas(img.width, img.height);
  createCanvas(windowWidth, windowHeight);

  //receiving the ingredients from the server
  socket.on("ingredient", newMsg);

  for (let i = 0; i < table.getRowCount(); i++) {
    // ingredients.push(myData[i][1]);
    carbon.push(table.get(i, 1));
    water.push(table.get(i, 2));
  }

  //receiving data from the index.html and make them case senditive
  function newMsg(data) {
    input = String(data).toLowerCase();
    print(String(data).toLowerCase());
  }

  image(img, 0, 0, img.width, img.height);
  //image(img, 0, 0, 1776, 1184);
  loadPixels();
  noStroke();
  //console.log(img.width,img.height); fruit-v3 size is (1776, 1184)

  for (var x = 0; x < width; x += size) {
    for (var y = 0; y < height; y += size) {
      let d = new dot(x, y);
      dots.push(d);
    }
  }
}

function draw() {
  background(255);
  for (i = dots.length - 1; i >= 0; i--) {
    dots[i].setupshow();
    dots[i].draw();
  }

  for (i = squares.length - 1; i >= 0; i--) {
    squares[i].animate();
    squares[i].draw();
  }
  selector();
}

class dot {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.index = (x + y * width) * 4;

    this.show = d;

    this.r = 0;
    this.g = 0;
    this.b = 0;

    this.rEnd = pixels[this.index];
    this.gEnd = pixels[this.index + 1];
    this.bEnd = pixels[this.index + 2];
    this.a = 255;

    this.col = color(this.r, this.g, this.b, this.a);
    this.light = lightness(this.col);
    this.radius = map(this.light, 0, 100, size, 3);
    this.fade = 0.01;
  }

  draw() {
    fill(this.r, this.g, this.b, this.a);
    rect(this.x, this.y, size);
  }

  animate() {
    // this.a = lerp(this.a, pixels[this.index], this.fade);

    this.r = lerp(this.r, this.rEnd, this.fade);
    this.g = lerp(this.g, this.gEnd, this.fade);
    this.b = lerp(this.b, this.bEnd, this.fade);
  }

  setupshow() {
    this.r = this.rEnd;
    this.g = this.gEnd;
    this.b = this.bEnd;
  }
}

function selector() {
  // picker = 0;
  for (let i = 0; i < table.getRowCount(); i++) {
    let checker = table.get(i, 0).toString().toLowerCase();

    if (input == checker) {
      picker = round(table.get(i, 1)) + round(table.get(i, 2));
      for (let i = 0; i <= picker; i++) {
        let randomPicker = random(dots);
        //  fill(0);
        let s = new Square(randomPicker.x, randomPicker.y);
        squares.push(s);
        //  square(randomPicker.x, randomPicker.y, size);
        //   showDots.push(randomPicker);
        //  print(showDots.length);
      }
    }

    picker = 0;
  }
  input = "null";
}

class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.a = 255;
  }

  draw() {
    fill(0, 0, 0, this.a);
    square(this.x, this.y, size);
  }

  animate() {
    this.a = lerp(this.a, 0, 0.005);
  }
}
