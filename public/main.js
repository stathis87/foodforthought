socket = io();


  // Get the input field
let myForm = document.getElementById('myform');

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

  // Message submit
myForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    // Get message text
    let msg = e.target.elements.msg.value;

    //emit the ingredient to the server
    socket.emit('ingredient', msg)
  
    msg = msg.trim();
  
    if (!msg) {
      return false;
    }
  
    // Emit message to server
    console.log('sending: ' + msg);
  
    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
  });