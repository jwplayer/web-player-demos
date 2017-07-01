// Start Playlist Overlay Example
function initInPlayer(playlistId) {
  jwplayer('in-player-demo').setup({
    displaytitle: true,
    logo: false,
    playlist: 'https://cdn.jwplayer.com/v2/playlists/' + playlistId
    // By default, the parameter visualplaylist is true.
  });
};

initInPlayer('6tYY3mSy');
// End Playlist Overlay Example

// Start Playlist Shelf Example
function initOutPlayer(playlistId) {
  var playerInstance = jwplayer('out-player-demo')
    .setup({
      displaytitle: false,
      logo: false,
      autostart: false,
      playlist: 'https://cdn.jwplayer.com/v2/playlists/' + playlistId,
      width: '100%',
      aspectratio: '16:9',
      visualplaylist: false
    });

  initPlaylist(playerInstance);
}

function initPlaylist(player) {
  $.ajax(player.getPlaylist()).then(function(data) {
    var playlistWrapper = $('.playlist-wrapper');
    var playlistTemplate = Handlebars.compile($('#out-player-playlist-template').html());
    playlistWrapper.html(playlistTemplate(data));

    playlistWrapper.on('click', '.playlist-item-link', setVideo.bind(this, data.playlist, player));
    player.on('playlistItem', setActive);
  });
}

function setVideo(playlist, player, e) {
  var currentVideo = $(e.target).closest('a').data('mediaid');
  var videoIndex = playlist.findIndex(function(video) {
    return currentVideo === video.mediaid;
  });

  e.preventDefault();

  player.playlistItem(videoIndex);
}

function setActive(e) {
  var id = e.item.mediaid;

  $('.playlist-item-link').removeClass('active')
    .filter(function(item) {
      return $(this).data('mediaid') === id;
    })
    .addClass('active');
}

initOutPlayer('6tYY3mSy');
// End Playlist Shelf Example
