const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("connected to server");
});

socket.addEventListener("message", (message) => {
  console.log(`message from server: ${message.data}`);
});

socket.addEventListener("close", () => {
  console.log("server connection lost");
});

setTimeout(() => {
  socket.send("Hello from the browser.");
}, 1000);
