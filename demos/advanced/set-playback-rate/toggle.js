(function() {
  'use strict';

  var toggleBtns = $('.button-toggle');

  function attachEvents() {
    toggleBtns.on('click', toggleDemos);
  }

  function toggleDemos(e) {
    var player;
    var target = e.target;
    var toggle = $(target).data('toggle');
    var playerTypes = [ 'user', 'publisher' ];

    if (target.classList.contains('button-toggle-on')) {
      return;
    }

    for (var i = 0; i < playerTypes.length; i++) {
      if (playerTypes[i] !== toggle) {
        player = jwplayer(playerTypes[i] + '-player');
        player.stop(true);
        resetVideoDefaults(player);

      }
    }
  
    document.querySelector('.play-btn').style.display = 'block';
    document.querySelector('.pause-btn').style.display = 'none';
    document.querySelector('.publisher-player-time').innerHTML = '00:00';

    toggleBtns.removeClass('button-toggle-on');
    $(target).addClass('button-toggle-on');

    $('.player-wrapper')
      .removeClass('demo-toggle-on')
      .filter(function() {
        return $(this).attr('id') === toggle + '-wrapper';
      })
      .addClass('demo-toggle-on');
  }

  function resetVideoDefaults(player) {
    seekComplete = automationComplete = undefined;
    player.setPlaybackRate(1);
  }

  attachEvents();
}());
