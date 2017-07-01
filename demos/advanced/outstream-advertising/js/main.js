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

// get element margin top and bottom totat height
var getMarginHeight = function(el) {
	if (document.all) {
		return parseInt(el.currentStyle.marginTop, 10) + parseInt(el.currentStyle.marginBottom, 10);
	} else {
		return parseInt(document.defaultView.getComputedStyle(el, '').getPropertyValue('margin-top')) + parseInt(document.defaultView.getComputedStyle(el, '').getPropertyValue('margin-bottom'));
	}
};

// check if ad is in view, ad visible class when necessary (but only the first time it's in view)
var setAdDisplayState = function() {
	if (getAdInView()) {
		if (!new RegExp('(^| )jw-ad-visible( |$)', 'gi').test(adEl.className)) {
			adEl.className += (adEl.className ? ' ' : '') + 'jw-ad-visible';
			adEl.style.maxHeight = adLabelEl.offsetHeight + getMarginHeight(adLabelEl) + adMediaContainerEl.offsetHeight + getMarginHeight(adMediaContainerEl) + 'px';
		}
		if (playerInstance.getState() === 'idle' || playerInstance.getState() === 'paused') {
			setTimeout(function() {
				playerInstance.play();
			}, 0);
		}
	} else {
		if (playerInstance.getState() === 'playing') {
			setTimeout(function() {
				playerInstance.pause();
			}, 0);
		}
	}
};

// player elements and utility vars
var playerInstance = jwplayer('player'),
	adEl = document.querySelector('.jw-ad'),
	adLabelEl = document.querySelector('.jw-ad-label'),
  adMediaContainerEl = document.querySelector('.jw-ad-media-container'),
  playerHeight,
  playerOffsetTop = getElementOffsetTop(adEl),
	isScrollTimeout = false; // namespace for whether or not we are waiting for setTimeout() to finish

// player setup
playerInstance.setup({
  file: 'http://content.jwplatform.com/videos/mX3zaT5H-Zq6530MP.mp4',
  advertising: {
    client: 'vast',
    tag: 'https://playertest.longtailvideo.com/vast-30s-ad.xml'
  }
});

playerInstance.on('ready', function() {

	// get player container height
	playerHeight = adMediaContainerEl.offsetHeight;

	// mute by default
	playerInstance.setMute(true);

	// unmute/mute player on adMediaContainerEl mouse enter/leave
	setEventListener(adMediaContainerEl, 'mouseenter', function() {
		playerInstance.setMute(false);
	});

	setEventListener(adMediaContainerEl, 'mouseleave', function() {
		playerInstance.setMute(true);
	});

	// handle ad display state on page load
	setTimeout(setAdDisplayState(), 1000);

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
	adEl.style.maxHeight = '0px';
  setTimeout(function() {
    playerInstance.remove();
    adMediaContainerEl.parentNode.removeChild(adMediaContainerEl);
  }, 500 /* should be the same duration as css transition */);
});
