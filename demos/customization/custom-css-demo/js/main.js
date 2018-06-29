  var player = jwplayer('player').setup({
    playlist: '//cdn.jwplayer.com/v2/media/jumBvHdL',
    skin: {
      name: 'alaska',
      url: 'skin/alaska.css'
    }
  });

  player.on('ready', function() {
    // Move the timeslider in-line with other controls
    var playerContainer = player.getContainer();
    var buttonContainer = playerContainer.querySelector('.jw-button-container');
    var spacer = buttonContainer.querySelector('.jw-spacer');
    var timeSlider = playerContainer.querySelector('.jw-slider-time');
    buttonContainer.replaceChild(timeSlider, spacer);

    // Gather all animating elements into an array
    var titlePrimary = playerContainer.querySelector('.jw-title-primary');
    var titleSecondary = playerContainer.querySelector('.jw-title-secondary');
    var previewImage = playerContainer.querySelector('.jw-preview');
    var playIcon = playerContainer.querySelector('.jw-display-icon-display');
    var animatedItems = [titlePrimary, titleSecondary, previewImage, playIcon];

    // Add animation class to each element in array
    playerContainer.addEventListener('mouseenter', function() {
      animatedItems.forEach(function(element) {
        element.classList.add('shift');
      });
    });

    // Remove animation class from each element in array
    playerContainer.addEventListener('mouseleave', function() {
      animatedItems.forEach(function(element) {
        element.classList.remove('shift');
      });
    });
  });
