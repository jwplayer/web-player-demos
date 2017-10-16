var player = jwplayer('player');

// Trigger error on player setup
player.setup({
  file: "//content.jwplatform.com//videos/not-a-real-video-file.mp4"
});

// Load custom video file on error
player.on('error', function() {
  player.load({
    file:"//content.jwplatform.com/videos/7RtXk3vl-52qL9xLP.mp4",
    image:"//content.jwplatform.com/thumbs/7RtXk3vl-480.jpg"
  });
  player.play();
});

// Also load custom video file on buffer
player.on('buffer', function() {
  theTimeout = setTimeout(function() {
    player.load({
      file:"//content.jwplatform.com/videos/7RtXk3vl-52qL9xLP.mp4",
      image:"//content.jwplatform.com/thumbs/7RtXk3vl-480.jpg"
    });
    player.play();
  }, 5000);
});

player.on('play', function() {
  clearTimeout(theTimeout);
});
