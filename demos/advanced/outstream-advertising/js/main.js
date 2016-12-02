/**
* Some utility fcn's for listening for `video-in-view`
*/
var playerInstance = jwplayer('player'),
    wrapper = document.querySelector('#player-wrapper'),
    scrollPlayed = false,
    playerHeight,
    checker = null,
    elementPos = function(element) {
        var bodyRect = document.body.getBoundingClientRect(),
            elemRect = element.getBoundingClientRect();
        return elemRect.top - bodyRect.top;
    },
    _bind = function(el, evt, fcn) {
        el[window.addEventListener ? 'addEventListener' : 'attachEvent']( window.addEventListener ? evt : 'on' + evt, fcn, false);
    },
		hasClass = function(el, className) {
			return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className)
		},
		removeClass = function(el, className) {
			el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), '').trim();
		},
		addClass = function(el, className) {
			el.className += (el.className ? ' ' : '') + className;
		},
    scrollPos = function() {
        var doc = document.documentElement;
        return {
            'left': (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
            'top': (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)
        };
    },
    playerInView = function() {
        var diff = playerOffset - scrollPos().top,
            adjust = window.innerHeight > (playerHeight/2) ? window.innerHeight : 100,
            inView = diff > -100 && diff < adjust;
        return inView;
    },
    playerOffset = elementPos(wrapper);

/**
* Setup the player
*/
playerInstance.setup({
    file: 'blank.mp4',
    advertising: {
        client: 'vast',
        tag: 'https://playertest.longtailvideo.com/vast-30s-ad.xml'
    }
});

playerInstance.on('ready', function() {

	// mute by default
	playerInstance.setMute(true);

	// get player container
	// var playerContainer = playerInstance.getContainer();

	// unmute/mute player on wrapper mouse enter/leave
	_bind(wrapper, 'mouseenter', function() {
		playerInstance.setMute(false);
	});
	_bind(wrapper, 'mouseleave', function() {
		playerInstance.setMute(true);
	});

    // get player height once ready
    playerHeight = playerInstance.getHeight();
    /**
    * Bind the scroll event to check for `video-in-view`
    */
    _bind(window, 'scroll', function(e) {
        clearTimeout(checker);
        if (playerInView()) {
					if (!hasClass(wrapper, 'jw-ad-visible')) {
						addClass(wrapper, 'jw-ad-visible');
						wrapper.style.height = playerHeight + 'px';
					}
          checker = setTimeout(function() {
            playerInstance.play(true);
            scrollPlayed = true;
          }, 100);
        }
        else {
					if (hasClass(wrapper, 'jw-ad-visible')) {
						removeClass(wrapper, 'jw-ad-visible');
						wrapper.style.height = '0px';
					}
          playerInstance.pause(true);
        }
    });
});

/**
* Collapse player after ad complete
*/
playerInstance.on('complete adComplete adError', function() {
	if (hasClass(wrapper, 'jw-ad-visible')) {
		removeClass(wrapper, 'jw-ad-visible');
		wrapper.style.height = '0px';
	}
  checker = setTimeout(function() {
    playerInstance.remove();
    wrapper.parentNode.removeChild(wrapper);
  }, 500); // should be the same duration as css transition
});
