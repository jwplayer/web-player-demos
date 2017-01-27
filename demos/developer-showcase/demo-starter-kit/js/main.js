jwplayer().on('ready', function() {
  var playerElement = document.getElementById(jwplayer().getContainer().id);
  var videoElement = playerElement.querySelector(".jw-video");
  videoElement.setAttribute("loop", "true");
});
