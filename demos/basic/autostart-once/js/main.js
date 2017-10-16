var pageReloaded = JSON.parse(localStorage.getItem('jwplayer.page-reloaded'));

var player = jwplayer('player').setup({
  playlist: 'https://cdn.jwplayer.com/v2/media/tkM1zvBq',
  // Do not autostart if the page was reloaded.
  autostart: pageReloaded ? !pageReloaded : true
});

localStorage.setItem('jwplayer.page-reloaded', true);
