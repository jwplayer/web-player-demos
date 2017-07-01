(function() {
'use strict';

  var toggleBtns = $('.button-toggle');

  function attachEvents() {
    toggleBtns.on('click', toggleDemos);
  }

  function toggleDemos(e) {
    var target = e.target;
    var toggle = $(target).data('toggle');

    jwplayer('in-player-demo').stop();
    jwplayer('out-player-demo').stop();

    if (target.classList.contains('button-toggle-on')) {
      return;
    }

    toggleBtns.removeClass('button-toggle-on');
    $(target).addClass('button-toggle-on');

    $('.player-demo-wrapper')
      .removeClass('demo-toggle-on')
      .filter(function() {
        return $(this).attr('id') === toggle + '-player';
      })
      .addClass('demo-toggle-on');
  }

  attachEvents();
})();
