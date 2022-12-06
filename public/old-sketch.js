let word = "hello";
let lang = []; //we create an empty array

var socket = io();

function setup() {
  createCanvas(800, 600);
  //frameRate(24);

  //we are connecting socket.io

//  const connection = async (ws:WebSocket) => {
//   console.log('new connection');

// for await (const ev of ws) {
//   console.log(ev);
// }

//  }

 
  
}


function draw() {
  background(225);
  textAlign(CENTER);
  textSize(48);
  fill(0);  
  updateWord();
  text(word, width/2,height/2);
  

  socket = io.connect('http://localhost:3000')

  io.on('connection', (socket) => {
    socket.on('ingredient', (msg) => {
      console.log('message: ' + msg);
    });
  });

}

function updateWord() {
  word = "";
  let len = floor(random(1, 15)); //floor round down and give εναν αρτιο αρθμό πχ 34.5 θα μας δωσει 34
  
  for (let i=0; i<len;i++){
    let c = char(floor(random(97, 122))); //char stands for character --> from ascii table we can see the characters at decximal 
    word = word + c;
  }
  lang.push(word);
  //console.log(lang);
}



