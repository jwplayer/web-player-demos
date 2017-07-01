// initialize jwplayer
var playerInstance = jwplayer('player');

// player dom elements
var playerContainerEl = document.querySelector('.player-container');

// returns video player position from top of document
function getElementOffsetTop(el) {
  var boundingClientRect = el.getBoundingClientRect();
  var bodyEl = document.body;
  var docEl = document.documentElement;
  var scrollTop = window.pageYOffset || docEl.scrollTop || bodyEl.scrollTop;
  var clientTop = docEl.clientTop || bodyEl.clientTop || 0;
  return Math.round(boundingClientRect.top + scrollTop - clientTop);
}

// returns the current y scroll position
function getScrollTop() {
  var docEl = document.documentElement;
  return (window.pageYOffset || docEl.scrollTop) - (docEl.clientTop || 0);
}

// configure jwplayer instance
playerInstance.setup({
  autostart: true,
  file: '//content.jwplatform.com/manifests/vM7nH0Kl.m3u8',
  primary: 'html5',
  setFullscreen: true,
  width: '100%'
});

// when jwplayer instance is ready
playerInstance.on('ready', function() {
        var config = playerInstance.getConfig();
        var utils = playerInstance.utils;
        // get height of player element
        var playerHeight = config.containerHeight;

        // get player element position from top of document
        var playerOffsetTop = getElementOffsetTop(playerContainerEl);

        // set player container to match height of actual video element
        // this prevents container from disappearing and changing element positions
        // on page when player becomes minimized. this also leaves a nice visual
        // placeholder space for minimized player to return to when appropriate
        playerContainerEl.style.height = playerHeight + 'px';

        // below we handle window scroll event without killing performance
        // this is a minimal approach. please consider implementing something more extensive:
        // i.e. http://joji.me/en-us/blog/how-to-develop-high-performance-onscroll-event

        // determine player display when scroll event is called
        // if inline player is no longer visible in viewport, add class
        // .player-minimize to minimize and float. otherwise, remove the class to put
        // player back to inline inline position
        function onScrollViewHandler() {
            var minimize = getScrollTop() >= playerOffsetTop;

            utils.toggleClass(playerContainerEl, 'player-minimize', minimize);
            // update the player's size so the controls are adjusted
            playerInstance.resize();
        }

        // namespace for whether or not we are waiting for setTimeout() to finish
        var isScrollTimeout = false;

        // window onscroll event handler
        window.onscroll = function() {
            // skip if we're waiting on a scroll update timeout to finish
            if (isScrollTimeout) return;
            // flag that a new timeout will begin
            isScrollTimeout = true;
            // otherwise, call scroll event view handler
            onScrollViewHandler();
            // set new timeout
            setTimeout(function() {
                // reset timeout flag to false (no longer waiting)
                isScrollTimeout = false;
            }, 80);

        };

    });