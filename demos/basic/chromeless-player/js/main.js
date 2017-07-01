var player = jwplayer("player");

player.setup({
    file: '//content.jwplatform.com/videos/jumBvHdL-cIp6U8lV.mp4',
    image: '//content.jwplatform.com/thumbs/jumBvHdL-720.jpg',
    controls: false
});

var playBtn = document.getElementById('play');
var pauseBtn = document.getElementById('pause');

playBtn.addEventListener('click', function() {
  player.play(true);
});

pauseBtn.addEventListener('click', function() {
  player.pause(true);
});
