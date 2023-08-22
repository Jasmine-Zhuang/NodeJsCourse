const socket = io();

socket.on("message", (message) => {
  console.log(message);
});

document.querySelector("#message-form").addEventListener("submit", (e) => {
  e.preventDefault(); // prevent default browser refresh
  const message = e.target.elements.message.value;
  socket.emit("sendMessage", message, (error) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message delivered.");
  });
});

document.querySelector("#send-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    // use mdn geolocation
    return alert("geolocation is not supported by your browser.");
  }
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit("sendLocation", {
      long: position.coords.longitude,
      lat: position.coords.latitude,
    }, (error) => {
        if (error) {
            return console.log(error);
        }
        console.log('Location shared.')
    });
  });
});
