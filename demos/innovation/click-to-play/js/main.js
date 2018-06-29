  // Request playlist data
  (function() {
    var httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
      return false;
    }
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          var json = JSON.parse(httpRequest.response);
          getThumbnails(json);
        } else {
          console.log(httpRequest.statusText);
        }
      }
    }
    httpRequest.open('GET', '//cdn.jwplayer.com/v2/playlists/0FDAGB12');
    httpRequest.send();
  })();

  // Render thumbnails into grid layout
  var thumbs = document.querySelectorAll('.thumb');
  var player;

  function getThumbnails(data) {
    var playlist = data.playlist;

    thumbs.forEach(function(thumb, i) {
      var video = playlist[i];
      var titleText = document.createElement('div');

      titleText.className = 'title-text';
      titleText.innerHTML = video.title;
      thumb.appendChild(titleText);
      thumb.setAttribute('id', video.mediaid + 1);
      thumb.style.backgroundImage = "url('" + video.image + "')";

      thumb.addEventListener('click', function(e) {
        handleActivePlayer(e, video);
      });
    })
  };

  // On click, destroy existing player, setup new player in target div
  function handleActivePlayer(e, video) {
    var activeDiv = e.target;
    if (player) {
      player.remove();
    }
    thumbs.forEach(function(thumb) {
      thumb.classList.remove('active');
    })
    activeDiv.classList.add('active');

    // Chain .play() onto player setup (rather than autostart: true)
    player = jwplayer(activeDiv.id).setup({
      file: '//content.jwplatform.com/manifests/' + video.mediaid + '.m3u8'
    }).play();

    // Destroy the player and replace with thumbnail
    player.on('complete', function() {
      player.remove();
      player = null;
    });
  }
