(function() {
  var apiRoute = 'https://cdn.jwplayer.com/v2/playlists/',
      feeds = [
        'Q352cyuc',
        'oR7ahO0J'
      ],
      playlistsTemplate = $('#js-playlist-template').html(),
      playerInstance;

  var setupPlayer = function(thisFeed) {
    // Initialize the player
    playerInstance = jwplayer('player').setup({
      playlist: thisFeed.playlist,
      visualplaylist: true,
      width: '60%'
    });

    // Change the highlighted item in the playlist when the video changes
    playerInstance.on('playlistItem', setActiveVideo);
  };

  var setActiveVideo = function(e) {
    var feedid = e.item.feedid,
        mediaid = e.item.mediaid;

    $('.js-video-link').removeClass('is-playing').filter(function() {
      return $(this).data('mediaid') === mediaid &&
        $(this).closest('.js-playlist').data('feedid') === feedid;
    }).addClass('is-playing');
  };

  var setActivePlaylist = function(e) {
    // Switch the visible playlist when its label is clicked
    var captured = $(this);
    e.preventDefault();

    if (!captured.hasClass('is-active')) {
      // Change the active playlist link
      $('.js-playlist-link').removeClass('is-active');
      captured.addClass('is-active');

      // Change the active visible playlist
      $('.js-playlist').removeClass('is-active').filter(function() {
        return $(this).data('feedid') === captured.data('feedid');
      }).addClass('is-active');
    }
  };

  var setPlayerVideo = function(e) {
    var captured = $(this),
        feedid = captured.closest('.js-playlist').data('feedid'),
        mediaid = captured.data('mediaid');

    // Gotta get the right playlist for this particular video link
    var currentPlaylist = feeds.filter(function(thisFeed) {
      return thisFeed.playlist.some(function(thisVideo) {
        return thisVideo.mediaid === mediaid && thisVideo.feedid === feedid;
      });
    }).shift().playlist;

    // Get the index of the video that matches this link's mediaid
    var videoIndex = currentPlaylist.findIndex(function(el) {
      return mediaid === el.mediaid;
    });

    e.preventDefault();

    // Only load this playlist if the player's current playlist is different
    if (currentPlaylist !== playerInstance.getPlaylist()) {
      playerInstance.load(currentPlaylist);
    }

    // Tell the player to play the video at this playlist index
    playerInstance.playlistItem(videoIndex);
  };

  var renderTemplate = function() {
    var playlistsContainer = $('#js-playlists');
    playlistsContainer.append(Handlebars.compile(playlistsTemplate)(feeds));

    // Create a delegate click event for playlist items
    playlistsContainer.on('click', '.js-video-link', setPlayerVideo);
    playlistsContainer.on('click', '.js-playlist-link', setActivePlaylist);
  };

  $.when.apply($, feeds.map(function(feedid) {
    // Use jQuery Deferreds to make sure all of the feeds are loaded before
    // rendering them or trying to initialize the player.
    var def = $.Deferred();
    $.ajax(apiRoute + feedid).done(function(data) {
      def.resolve(data);
    });
    return def.promise();
  })).then(function() {
    // replace the feeds array with all of the now-fetched feed objects
    feeds = $.makeArray(arguments);
    renderTemplate();
    setupPlayer(feeds[0]);
  });
})();

// Instead of using jQuery Deferred objects, you could use Promises.
// Promises, fetch(), and arrow functions aren't supported in IE.
// Promise.all(
//   feeds.map(feedid => fetch(apiRoute + feedid).then(resp => resp.json()))
// ).then(results => {
//   feeds = results;
//   renderTemplate();
//   setupPlayer(feeds[0]);
// });
