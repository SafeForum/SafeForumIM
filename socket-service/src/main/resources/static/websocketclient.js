const socket = new WebSocket('ws://your-websocket-server");

// Connection opened
socket.addEventListener('open', (event) => {
  console.log('WebSocket connection established');
});

// Listen for messages
socket.addEventListener('message', (event) => {
  const message = event.data;
  console.log('Received message:', message);
  // Handle the received message as needed
});

// Send a message
function sendMessage(message) {
  socket.send(message);
}