var videoContainer = $('#js-background-video-container'),
    fullPlaylist;

function setupPlayer() {
  // This flag is used to prevent unnecessary cycles with the time event
  var isReady = false;

  var backgroundVideo = jwplayer('js-background-video').setup({
    autostart: true,
    controls: false,
    playlist: fullPlaylist,
    mute: true,
    repeat: true,
    stretching: 'fill',
    height: '100%',
    width: '100%'
  });


  /**
   * When the next playlist item is triggered, we can remove the video's opacity
   */
  backgroundVideo.on('firstFrame', function(e) {
    videoContainer.removeClass('is-fading');
  });

  /**
   * We use the video container's CSS transition-end event to queue up the next
   * video's poster image.
   */
  videoContainer.on('transitionend', function(e) {
    if (!videoContainer.hasClass('is-fading')) {
      setPosterImage();
    }
  }).trigger('transitionend');


  /**
   * Two seconds before the video ends, we take the poster image of the next-up
   * video and set it as the background of the container.
   */
  backgroundVideo.on('time', function(e) {
    if (e.position >= (e.duration - 2) && !isReady) {
      isReady = true;
      videoContainer.addClass('is-fading');
    }
  });


  /**
   * When the video is done, we reset the isReady flag to make sure we can check
   * the time event properly for the next video.
   */
  backgroundVideo.on('complete', function() {
    isReady = false;
  });


  /**
   * setPosterImage just makes sure the poster image is loaded and ready to go
   * before setting the video container background and fading the video out.
   */
  function setPosterImage() {
    var posterImage;
    // Get the next video's playlist index, so we can set the poster image for
    // the fadeout animation
    var nextIndex = backgroundVideo.getPlaylistIndex() + 1;
    nextIndex = nextIndex >= fullPlaylist.length ? 0 : nextIndex;
    posterImage = fullPlaylist[nextIndex]['image'];

    $('<img>').attr('src', posterImage).load(function() {
      $(this).remove();
      videoContainer.css('background-image', 'url(' + posterImage + ')');
    });
  }
}


/**
 * If we grab the playlist feed before setting up the player, we can manipulate
 * the playlist object and set up any specific adjustments. For instance, you
 * could shuffle the order of the playlist items.
 */
$.ajax({
  /**
   * Fun fact: You can use a single video's media ID with the Feeds API and it
   * will return a playlist with one video. Pretty nifty!
   */
  url: '//content.jwplatform.com/feeds/CSh1f2GU.json',
  dataType: 'JSON'
}).done(function(data) {
  /**
   * We store the playlist so we can set the background image of the next video
   * for a smooth transition between videos.
   */
  fullPlaylist = data.playlist;
  setupPlayer();
});
