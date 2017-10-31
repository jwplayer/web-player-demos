// Add your JavaScript here
var playerInstance = jwplayer('player');

playerInstance.setup({
  playlist: '//cdn.jwplayer.com/v2/media/xJ7Wcodt',
  sharing: {
    sites: [
      'facebook',
      'twitter',
      {
        icon: 'assets/whatsapp.png',
        src: shareToWhatsApp,
        label: 'WhatsApp'
      }
    ]
  }
});

function shareToWhatsApp() {
  // If a permalink is configured for a piece of content in the dashboard, it will share it.
  // If not, it will fall back to sharing the current page's URL (or preview page if using a feed).
  var linkToShare = playerInstance.getPlaylistItem().link || window.location;

  window.location.href = 'https://api.whatsapp.com/send?text=' + linkToShare;
}