const playerInstance = jwplayer('player').setup({
  playlist: 'https://cdn.jwplayer.com/v2/media/1g8jjku3?sources=mpd'
});


const provider = document.getElementById('provider');
playerInstance.once('meta', () => {
  provider.textContent = playerInstance.getProvider().name;
});

const sourceType = document.getElementById('source-type');
playerInstance.once('playlistItem', e => {
  sourceType.textContent = e.item.sources[0].type;
});
