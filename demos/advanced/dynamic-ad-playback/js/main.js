  var message = document.querySelector('.message');
  var tag = 'assets/preroll.xml';
  var player = jwplayer('player');

  player.setup({
    playlist: '//cdn.jwplayer.com/v2/media/hWF9vG66',
    advertising: {
      client: 'vast'
    }
  });

  player.on('play',function() {
    showButton();
  });

  player.on('pause',function() {
    hideButton('Unpause the video to continue.');
  });

  player.on('complete', function() {
    hideButton('Restart video to continue.');
  });

  player.on('adPlay', function() {
    hideButton('Ad playing, please wait (or skip it)')
  });

  player.on('adPause', function() {
    hideButton('Unpause the ad to continue.')
  });

  player.on('adSkipped', function() {
    showButton();
  });

  player.on('adComplete', function() {
    showButton();
  });

  function triggerAd() {
    player.playAd(tag);
  };

  function showButton() {
    message.innerHTML = 'Play an Ad';
    message.classList.add('button');
    message.addEventListener('click', triggerAd);
  };

  function hideButton(messageText) {
    message.innerHTML = messageText;
    message.classList.remove('button');
    message.removeEventListener('click', triggerAd);
  };
