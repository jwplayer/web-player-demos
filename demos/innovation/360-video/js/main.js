var player = jwplayer('vr-player').setup({
	primary: 'html5',
	hlshtml: true,
	width: '100%',
	playlist: [{
		title: 'Caminandes VR',
		mediaid: 'D5X2Trf5',
		image: '//content.jwplatform.com/thumbs/D5X2Trf5-720.jpg',
		link: '//content.jwplatform.com/previews/D5X2Trf5',
		sources: [{
			file: '//content.jwplatform.com/manifests/D5X2Trf5.m3u8',
			type: 'hls'
		}, {
			duration: 41,
			file: '//content.jwplatform.com/videos/D5X2Trf5-O8SBuWVa.mp4',
			height: 1080,
			label: '3840x1080 px',
			type: 'video/mp4',
			width: 3840
		}, {
			duration: 41,
			file: '//content.jwplatform.com/videos/D5X2Trf5-Na6BIilo.mp4',
			height: 720,
			label: '2560x720 px',
			type: 'video/mp4',
			width: 2560,
      "default": true
		}, {
			duration: 41,
			file: '//content.jwplatform.com/videos/D5X2Trf5-gl5LxSde.mp4',
			height: 360,
			label: '640x180 px',
			type: 'video/mp4',
			width: 1280
		}],
		tracks: [{
			file: '//content.jwplatform.com/strips/D5X2Trf5-120.vtt',
			kind: 'thumbnails'
		}]
	}],
	plugins: {
		'https://ssl.p.jwpcdn.com/player/plugins/vr/vr.js': {}
	}
});

player.on('error', function(error) {
	var errorDiv = document.querySelector("#error");
	if (error.message == jwplayer.vr.events.UNSUPPORTED_BROWSER ||
		error.message == jwplayer.vr.events.INITIALIZATION_ERROR) {
		errorDiv.classList.add('active');
		if (error.message == jwplayer.vr.events.UNSUPPORTED_BROWSER) {
			if (jwplayer.utils.isSafari()) {
				errorDiv.innerHTML = 'Safari is currently unsupported, please visit this ' +
					'page using <a href="https://www.google.com/chrome/">Google Chrome</a> ' +
					'or <a href="https://www.mozilla.org/en-US/firefox/new/">Mozilla Firefox</a>.';
			} else {
				errorDiv.innerHTML = error.message +
					' Please upgrade to a browser with <a href="https://get.webgl.org/">WebGL support</a>.';
			}
		} else {
			errorDiv.innerHTML = error.message;
		}
	}
	console.error('Error: ' + error.message);
});
