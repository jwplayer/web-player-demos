(function() {
  'use strict';

  var refreshBtn = document.querySelector('.refresh');
  var clearStorageBtn = document.querySelector('.clear-storage');

  refreshBtn.addEventListener('click', function() {
    window.location.reload();
  });

  clearStorageBtn.addEventListener('click', function() {
    delete localStorage['jwplayer.page-reloaded'];
    window.location.reload();
  });

}());
