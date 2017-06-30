(function() {
  'use strict';

  var player;
  var scrollThreshold, scrollTimeout, ticking, lastThresholdCrossed, currentThresholdCrossed;
  var lastScrollHeight = 0;
  // We will want to pause the video when it is only ten percent visible
  var banner = document.querySelector('.footer-banner');

  function init() {
    player = jwplayer('player').setup({
      playlist: '//cdn.jwplayer.com/v2/media/ioyt59Zj',
      autostart: true,
      mute: true
    });

    scrollThreshold = getBottomTenPercentDepth(document.getElementById('player'));

    attachEvents(player);
  }

  function attachEvents(player) {
    player.on('playlistItem', function(e) {
      banner.querySelector('.video-title').innerHTML = e.item.title;
    });

    banner.querySelector('.playback-btn').addEventListener('click', togglePlaybackOnClick);

    player.on('pause', togglePlaybackDisplay.bind(null, 'add'));
    player.on('play', togglePlaybackDisplay.bind(null, 'remove'));

    window.addEventListener('scroll', onScroll, false);
  }

  function togglePlaybackOnClick() {
    player.play(banner.classList.contains('is-paused'));
  }

  function togglePlaybackDisplay(method) {
    banner.classList[method]('is-paused');
  }

  function onScroll() {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    requestTick();

    scrollTimeout = setTimeout(function() {
      ticking = cancelAnimationFrame(ticking);
      lastScrollHeight = window.pageYOffset;
    }, 100);
  }

  function requestTick() {
    if (!ticking) {
      ticking = requestAnimationFrame(update);
    }
  }

  function update() {
    toggleBanner();
    togglePlayback();

    ticking = requestAnimationFrame(update);
  }

  function toggleBanner() {
    if (lastScrollHeight <= window.pageYOffset) {
      banner.classList.add('is-visible');
    } else {
      banner.classList.remove('is-visible');
    }
  }

  function togglePlayback() {
    lastThresholdCrossed = lastScrollHeight > scrollThreshold;
    currentThresholdCrossed = window.pageYOffset > scrollThreshold;

    if (lastThresholdCrossed !== currentThresholdCrossed) {
      // If user has scrolled beyond the threshold set, pause the video; otherwise play.
      player.play(!currentThresholdCrossed);
    }
  }

  function getBottomTenPercentDepth(element) {
    var elementYOffset = 0;
    var ninetyPercentElementHeight = element.offsetHeight * 0.9;

    while (element) {
      elementYOffset += element.offsetTop;
      element = element.offsetParent;
    }

    return elementYOffset + ninetyPercentElementHeight;
  }

  init();
}());
