//Require the necessary packages
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


//Set up a route for the home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//Handle socket connections and disconnections
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

//Serve the application
http.listen(3000, () => {
  console.log('listening on *:3000');
});






/*

Run the command node index.js to start the server.
Open your web browser and go to http://localhost:3000/.
You should see the chat app interface, which consists of a text input 
field, a submit button and a list of messages.

Open another browser window or tab and go to http://localhost:3000/. 
This will simulate another user joining the chat room.

Type a message in the text input field and click the submit button. 
The message should appear on both browser windows.

When you're done, press Ctrl+C in your terminal to stop the server.
*/