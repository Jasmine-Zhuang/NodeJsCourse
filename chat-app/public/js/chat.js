const socket = io();

// Elements
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $sendLocationButton = document.querySelector("#send-location");
const $messages = document.querySelector("#messages");

// Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationMessageTemplate = document.querySelector(
  "#location-message-template"
).innerHTML;

// Options
const { username, room } = Qs.parse(location.search, {ignoreQueryPrefix: true})

socket.on("message", (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    message: message.text,
    createdAt: moment(message.createdAt).format("h:m a"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
});

socket.on("locationMessage", (message) => {
  console.log(message);
  const html = Mustache.render(locationMessageTemplate, {
    url: message.url,
    createdAt: moment(message.createdAt).format("h:m a"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
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
      () => {
        // enable button
        $sendLocationButton.removeAttribute("disabled");
        console.log("Location shared.");
      }
    );
  });
});

socket.emit('join', {username, room}, (error) => {
  if (error) { // if user fails to join the room, alert the error and redirect them to the join page
    alert(error);
    location.href = '/'
  }
})