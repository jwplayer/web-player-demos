  var titleDiv = document.getElementById('title');
  var artistDiv = document.getElementById('artist');
  var imageDiv = document.getElementById('image');
  var player = jwplayer('player');

  // Set up the player with an HLS stream that includes timed metadata
  player.setup({
    file: 'assets/index.m3u8'
  });

  // Retrieve metadata
  player.on('meta', function(e) {
    if (e.metadata) {
      var title = e.metadata.title;
      var artist = e.metadata.artist;
      var imageUrl = e.metadata.url;

      title ? titleDiv.innerHTML = title : titleDiv.innerHTML = 'Unknown';
      artist ? artistDiv.innerHTML = artist : artistDiv.innerHTML = 'Unknown';
      imageUrl ? imageDiv.src = imageUrl : imageDiv.src = 'assets/jwlogo.png';
    };
  });

  // Handle reset of player at end of content
  player.on('error', function(e) {
    if (e.message === 'The live stream is either down or has ended') {
      player.load({
        file: 'assets/index.m3u8'
      });
    }
  });
