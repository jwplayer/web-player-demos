var sources = [{
	"file": "//vr.jwplayer.com/content/AgqYcfAT/AgqYcfAT-FctPAkow.mp4",
	"height": 720,
	"label": "720p",
	"type": "video/mp4",
	"width": 1280
}, {
	"file": "//vr.jwplayer.com/content/AgqYcfAT/AgqYcfAT-8yQ1cYbs.mp4",
	"height": 1080,
	"label": "1080p",
	"type": "video/mp4",
	"width": 1920,
	"default": "true"
}, {
	"file": "//vr.jwplayer.com/content/AgqYcfAT/AgqYcfAT-23qU5w1k.mp4",
	"height": 1440,
	"label": "1440p",
	"type": "video/mp4",
	"width": 2560
}, {
	"file": "//vr.jwplayer.com/content/AgqYcfAT/AgqYcfAT-o50QFIC7.mp4",
	"height": 2048,
	"label": "2048p",
	"type": "video/mp4",
	"width": 3640
}];

var player = jwplayer('vr-player').setup({
	primary: 'html5',
	hlshtml: true,
	width: '100%',
	aspectratio: '16:9',
	playlist: [{
		title: 'Caminandes VR',
		mediaid: 'AgqYcfAT',
		image: '//content.jwplatform.com/thumbs/AgqYcfAT-1920.jpg',
		link: '//content.jwplatform.com/previews/AgqYcfAT',
		stereomode: 'monoscopic',
		sources: sources,
		tracks: [{
			file: '//content.jwplatform.com/strips/AgqYcfAT-120.vtt',
			kind: 'thumbnails'
		}]
	}]
});

var errorDiv = document.querySelector("#error");

if (player.getEnvironment().OS.iOS) {
	// iOS doesn't support CORS.
	// See: https://bugs.webkit.org/show_bug.cgi?id=135379
	sources = [{
		file: window.location.origin + '/static/AgqYcfAT-8yQ1cYbs.mp4',
		type: 'video/mp4'
	}];
}

player.on('error', function(error) {
	if (error.message == '360° video playback is not supported in this browser.') {
		errorDiv.textContent = error.message +
			' Please upgrade to a browser with <a href="https://get.webgl.org/">WebGL support</a>.';
		handleError(error);
	}
});

player.on('ready', function() {
	var vrPlugin = player.getPlugin('vr');
	if (vrPlugin) {
		vrPlugin.on('error', function(error) {
			errorDiv.textContent = error.message;
			handleError(error);
		});
	}
});

function handleError(error) {
	console.error('Error: ' + error.message);
	errorDiv.classList.add('active');
}

// Insert player version
if (jwplayer().id) {
	jwplayer().on('ready', function() {
		document.getElementById('player-version').innerHTML = jwplayer.version.split('+')[0];
	});
}
