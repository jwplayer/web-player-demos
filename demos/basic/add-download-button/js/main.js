var player = jwplayer('player');

player.setup({
  playlist: 'https://cdn.jwplayer.com/v2/media/8L4m9FJB'
});

player.addButton(
  //This portion is what designates the graphic used for the button
  "//icons.jwplayer.com/icons/white/download.svg",
  //This portion determines the text that appears as a tooltip
  "Download Video",
  //This portion designates the functionality of the button itself
  function() {
    //With the below code, we're grabbing the file that's currently playing
    window.location.href = player.getPlaylistItem()['file'];
  },
  //And finally, here we set the unique ID of the button itself.
  "download"
);
