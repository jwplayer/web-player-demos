// math functions related to scroll and offset positions relative to player
var getScrollTop = function() {
	var documentEl = document.documentElement;
	return (window.pageYOffset || documentEl.scrollTop) - (documentEl.clientTop || 0);
};
var getElementOffsetTop = function(el) {
	var bodyRect = document.body.getBoundingClientRect(),
		elRect = el.getBoundingClientRect();
	return elRect.top - bodyRect.top;
};
var	getAdInView = function() {
	var scrollBoundary = playerOffsetTop + (playerHeight / 2),
		scrollTop = getScrollTop();
	return (window.innerHeight + scrollTop) > scrollBoundary && scrollTop < scrollBoundary;
};

// cross-browser event binding method
var setEventListener = function(el, ev, fn) {
	var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent',
		eventName = window.addEventListener ? ev : 'on' + ev;
	el[eventMethod](eventName, fn, false);
};

// check if ad is in view, ad visible class when necessary (but only the first time it's in view)
var setAdDisplayState = function() {
	if (getAdInView()) {
		if (!new RegExp('(^| )jw-ad-visible( |$)', 'gi').test(adEl.className)) {
			adEl.className += (adEl.className ? ' ' : '') + 'jw-ad-visible';
		}
		playerInstance.play();
	} else {
		playerInstance.pause();
	}
};

// player elements and utility vars
var playerInstance = jwplayer('player'),
  adEl = document.querySelector('.jw-ad'),
  adContainerEl = document.querySelector('.jw-ad-container'),
  playerHeight,
  playerOffsetTop = getElementOffsetTop(adEl);

// player setup
playerInstance.setup({
  file: 'blank.mp4',
  advertising: {
    client: 'vast',
    tag: 'https://playertest.longtailvideo.com/vast-30s-ad.xml'
  }
});

playerInstance.on('ready', function() {

	// get player container height
	playerHeight = adContainerEl.offsetHeight;

	// mute by default
	playerInstance.setMute(true);

	// unmute/mute player on adContainerEl mouse enter/leave
	setEventListener(adContainerEl, 'mouseenter', function() {
		playerInstance.setMute(false);
	});

	setEventListener(adContainerEl, 'mouseleave', function() {
		playerInstance.setMute(true);
	});

	// handle ad display state on page load
	setAdDisplayState();

	// namespace for whether or not we are waiting for setTimeout() to finish
	var isScrollTimeout = false;

  // attach scroll event listener to window
  setEventListener(window, 'scroll', function() {
		// skip if we're waiting on a scroll update timeout to finish
		if (isScrollTimeout) return;
		// flag that a new timeout will begin
		isScrollTimeout = true;
		// otherwise, execute scroll event handler
		setAdDisplayState();
		// set new timeout
		setTimeout(function() {
			// reset timeout flag to false (no longer waiting)
			isScrollTimeout = false;
		}, 100);
  });
});

// handle when ad is complete or encounters error
playerInstance.on('complete adComplete adError', function() {
	addClass(adEl, 'jw-ad-complete');
  setTimeout(function() {
		adEl.className += adEl.className + ' jw-ad-visible';
    playerInstance.remove();
    adContainerEl.parentNode.removeChild(adContainerEl);
  }, 400 /* should be the same duration as css transition */);
});
