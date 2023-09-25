const socket = io();

// Elements
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $sendLocationButton = document.querySelector("#send-location");

socket.on("message", (message) => {
  console.log(message);
});

$messageForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent default browser refresh
  // disable form button once it's been submitted already
  $messageFormButton.setAttribute("disabled", "disabled");

  const message = e.target.elements.message.value;
  socket.emit("sendMessage", message, (error) => {
    // enable form button
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();

    if (error) {
      return console.log(error);
    }
    console.log("Message delivered.");
  });
});

$sendLocationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    // use mdn geolocation
    return alert("geolocation is not supported by your browser.");
  }
  // disable button
  $sendLocationButton.setAttribute("disabled", "disabled");

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit(
      "sendLocation",
      {
        long: position.coords.longitude,
        lat: position.coords.latitude,
      },
      (error) => {
        $sendLocationButton.removeAttribute("disabled");
        console.log("Location shared.");
      }
    );
  });
});
