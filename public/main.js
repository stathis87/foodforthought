socket = io();


  // Get the input field
//let myInput = document.getElementById('myinput');
let myForm = document.getElementById('myform');

//let inputValue = myInput.value
    
  //var inputstring = Sting(input);
  //var inpstr = value.toString(input);

  

//   // Execute a function when the user presses a key on the keyboard
//   document.addEventListener("keypress", function(event) {
//     // If the user presses the "Enter" key on the keyboard
//     if (event.key === "Enter") {
//       // Cancel the default action, if needed
//       event.preventDefault();
//       // Trigger the button element with a click
//       document.getElementById("btn-submit").click();
//     }
//   });


  socket.on('message', message => {
    console.log(message);
  });

 
  //socket.emit('myinput', 'test message');


  // Message submit
myForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    // Get message text
    let msg = e.target.elements.msg.value;


    //console.log(msg);

    //emit the ingredient to the server
    socket.emit('ingredient', msg)
  
    // msg = msg.trim();
  
    // if (!msg) {
    //   return false;
    // }
  
    // Emit message to server
    socket.emit('Message', msg);
    console.log(msg);
  
    // Clear input
    // e.target.elements.msg.value = '';
    // e.target.elements.msg.focus();
  });