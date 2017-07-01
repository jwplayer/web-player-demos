(function () {
	'use strict';

	jwplayer('streamroot-player')
		.setup({
			playlist: [{
				file: 'https://wowza-cloudfront.streamroot.io/liveorigin/stream4/playlist.m3u8'
			}],
			p2pConfig: {
				streamrootKey: 'demoswebsiteandpartners',
			},
			hlsjsConfig: {
				liveSyncDuration: 40,
				liveMaxLatencyDuration: 80
			},
			logo: {
				file: './assets/logo.png',
				link: 'https://streamroot.io',
				position: 'top-left'
			},
			width: 600,
			height: 400,
			autostart: true
		});

	if (!Streamroot.p2pAvailable) {
		document.querySelector('#streamroot-graphs-left').setAttribute('style', 'display:none');
		document.querySelector('#streamroot-graphs-right').setAttribute('style', 'display:none');
		document.querySelector('#warning-not-compatible').setAttribute('style', 'display:block');
	}

})();
