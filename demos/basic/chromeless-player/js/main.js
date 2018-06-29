var player = jwplayer("player");

player.setup({
    playlist: 'https://cdn.jwplayer.com/v2/media/yp34SRmf',
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
