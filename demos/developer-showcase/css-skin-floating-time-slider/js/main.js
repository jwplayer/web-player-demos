var player = jwplayer('player');

var file = '1b02B03R';

player.setup({
	file: '//content.jwplatform.com/manifests/' + file + '.m3u8',
	tracks: [{
		kind: 'thumbnails',
		file: '//content.jwplatform.com/strips/' + file + '-120.vtt'
	}],
	autostart: true,
	width: '100%',
  skin: {
  	name: 'custom',
		url: 'css/build.css'
  }
});
