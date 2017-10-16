var r = Math.random();

jwplayer("player1").setup({
  file: "//content.jwplatform.com/videos/i3q4gcBi-FctPAkow.mp4",
  image: "//content.jwplatform.com/thumbs/i3q4gcBi-300.jpg",
  stretching: "fill",
  width: 300,
  height: 300,
  repeat: "true",
});

jwplayer("player2").setup({
  file: "//content.jwplatform.com/videos/tkM1zvBq-FctPAkow.mp4",
  image: "//content.jwplatform.com/thumbs/tkM1zvBq-300.jpg",
  stretching: "fill",
  width: 300,
  height: 300,
  repeat: "true",
});

jwplayer("player3").setup({
  file: "//content.jwplatform.com/videos/RDn7eg0o-FctPAkow.mp4",
  image: "//content.jwplatform.com/thumbs/RDn7eg0o-300.jpg",
  stretching: "fill",
  width: 300,
  height: 300,
  repeat: "true",
});

jwplayer("player4").setup({
  file: "//content.jwplatform.com/videos/7CWdQFCL-FctPAkow.mp4",
  image: "//content.jwplatform.com/thumbs/7CWdQFCL-300.jpg",
  stretching: "fill",
  width: 300,
  height: 300,
  repeat: "true",
});

jwplayer("player5").setup({
  file: "//content.jwplatform.com/videos/jumBvHdL-FctPAkow.mp4",
  image: "//content.jwplatform.com/thumbs/jumBvHdL-300.jpg",
  stretching: "fill",
  width: 300,
  height: 300,
  repeat: "true",
});

jwplayer("player6").setup({
  file: "//content.jwplatform.com/videos/iLwfYW2S-FctPAkow.mp4",
  image: "//content.jwplatform.com/thumbs/iLwfYW2S-300.jpg",
  stretching: "fill",
  width: 300,
  height: 300,
  repeat: "true",
});

jwplayer("player1").on('beforePlay', function() {
  jwplayer("player1").setMute(false);
  jwplayer("player2").setMute(true);
  jwplayer("player3").setMute(true);
  jwplayer("player4").setMute(true);
  jwplayer("player5").setMute(true);
  jwplayer("player6").setMute(true);
});

jwplayer("player1").on('play', function() {
  if (navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPhone/i) != null){
    if(jwplayer("player2").getState() == "PLAYING"){
      jwplayer("player2").pause();
    }
    if(jwplayer("player3").getState() == "PLAYING"){
      jwplayer("player3").pause();
    }
    if(jwplayer("player4").getState() == "PLAYING"){
      jwplayer("player4").pause();
    }
    if(jwplayer("player5").getState() == "PLAYING"){
      jwplayer("player5").pause();
    }
    if(jwplayer("player6").getState() == "PLAYING"){
      jwplayer("player6").pause();
    }
  }
});

jwplayer("player2").on('beforePlay', function() {
  jwplayer("player1").setMute(true);
  jwplayer("player2").setMute(false);
  jwplayer("player3").setMute(true);
  jwplayer("player4").setMute(true);
  jwplayer("player5").setMute(true);
  jwplayer("player6").setMute(true);
});

jwplayer("player2").on('play', function() {
  if (navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPhone/i) != null){
    if(jwplayer("player1").getState() == "PLAYING"){
      jwplayer("player1").pause();
    }
    if(jwplayer("player3").getState() == "PLAYING"){
      jwplayer("player3").pause();
    }
    if(jwplayer("player4").getState() == "PLAYING"){
      jwplayer("player4").pause();
    }
    if(jwplayer("player5").getState() == "PLAYING"){
      jwplayer("player5").pause();
    }
    if(jwplayer("player6").getState() == "PLAYING"){
      jwplayer("player6").pause();
    }
  }
});

jwplayer("player3").on('beforePlay', function() {
  jwplayer("player1").setMute(true);
  jwplayer("player2").setMute(true);
  jwplayer("player3").setMute(false);
  jwplayer("player4").setMute(true);
  jwplayer("player5").setMute(true);
  jwplayer("player6").setMute(true);
});

jwplayer("player3").on('play', function() {
  if (navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPhone/i) != null){
    if(jwplayer("player1").getState() == "PLAYING"){
      jwplayer("player1").pause();
    }
    if(jwplayer("player2").getState() == "PLAYING"){
      jwplayer("player2").pause();
    }
    if(jwplayer("player4").getState() == "PLAYING"){
      jwplayer("player4").pause();
    }
    if(jwplayer("player5").getState() == "PLAYING"){
      jwplayer("player5").pause();
    }
    if(jwplayer("player6").getState() == "PLAYING"){
      jwplayer("player6").pause();
    }
  }
});

jwplayer("player4").on('beforePlay', function() {
  jwplayer("player1").setMute(true);
  jwplayer("player2").setMute(true);
  jwplayer("player3").setMute(true);
  jwplayer("player4").setMute(false);
  jwplayer("player5").setMute(true);
  jwplayer("player6").setMute(true);
});

jwplayer("player4").on('play', function() {
  if (navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPhone/i) != null){
    if(jwplayer("player1").getState() == "PLAYING"){
      jwplayer("player1").pause();
    }
    if(jwplayer("player2").getState() == "PLAYING"){
      jwplayer("player2").pause();
    }
    if(jwplayer("player3").getState() == "PLAYING"){
      jwplayer("player3").pause();
    }
    if(jwplayer("player5").getState() == "PLAYING"){
      jwplayer("player5").pause();
    }
    if(jwplayer("player6").getState() == "PLAYING"){
      jwplayer("player6").pause();
    }
  }
});

jwplayer("player5").on('beforePlay', function() {
  jwplayer("player1").setMute(true);
  jwplayer("player2").setMute(true);
  jwplayer("player3").setMute(true);
  jwplayer("player4").setMute(true);
  jwplayer("player5").setMute(false);
  jwplayer("player6").setMute(true);
});

jwplayer("player5").on('play', function() {
  if (navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPhone/i) != null){
    if(jwplayer("player1").getState() == "PLAYING"){
      jwplayer("player1").pause();
    }
    if(jwplayer("player2").getState() == "PLAYING"){
      jwplayer("player2").pause();
    }
    if(jwplayer("player3").getState() == "PLAYING"){
      jwplayer("player3").pause();
    }
    if(jwplayer("player4").getState() == "PLAYING"){
      jwplayer("player4").pause();
    }
    if(jwplayer("player6").getState() == "PLAYING"){
      jwplayer("player6").pause();
    }
  }
});

jwplayer("player6").on('beforePlay', function() {
  jwplayer("player1").setMute(true);
  jwplayer("player2").setMute(true);
  jwplayer("player3").setMute(true);
  jwplayer("player4").setMute(true);
  jwplayer("player5").setMute(true);
  jwplayer("player6").setMute(false);
});

jwplayer("player6").on('play', function() {
  if (navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPhone/i) != null){
    if(jwplayer("player1").getState() == "PLAYING"){
      jwplayer("player1").pause();
    }
    if(jwplayer("player2").getState() == "PLAYING"){
      jwplayer("player2").pause();
    }
    if(jwplayer("player3").getState() == "PLAYING"){
      jwplayer("player3").pause();
    }
    if(jwplayer("player4").getState() == "PLAYING"){
      jwplayer("player4").pause();
    }
    if(jwplayer("player5").getState() == "PLAYING"){
      jwplayer("player5").pause();
    }
  }
});

function launchFullscreen(element) {
  if(element.requestFullscreen) {
  element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
  element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
  element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
  element.msRequestFullscreen();
  }
  document.getElementById('container2').style.height = "600px";
  document.getElementById('container2').style.width = "600px";
  document.getElementById('front').setAttribute('style', 'transform: translateZ(500px) !important;');
  jwplayer("player1").resize(600,600);
  jwplayer("player2").resize(600,600);
  jwplayer("player3").resize(600,600);
  jwplayer("player4").resize(600,600);
  jwplayer("player5").resize(600,600);
  jwplayer("player6").resize(600,600);
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
  document.getElementById('container2').style.height = "300px";
  document.getElementById('container2').style.width = "300px";
  document.getElementById('front').setAttribute('style', 'transform: translateZ(200px);');
  jwplayer("player1").resize(300,300);
  jwplayer("player2").resize(300,300);
  jwplayer("player3").resize(300,300);
  jwplayer("player4").resize(300,300);
  jwplayer("player5").resize(300,300);
  jwplayer("player6").resize(300,300);
}

document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (evt.keyCode == 27) {
    exitFullscreen();
  }
};

exitFullscreen();

document.onkeyup = function(evt) {
  evt = evt || window.event;
  if (evt.keyCode == 27) {
    exitFullscreen();
  }
};

document.addEventListener("mozfullscreenchange", function () {
  if (document.mozFullScreen) {
    launchFullscreen();
  } else {
    exitFullscreen();
  }
}, false);

document.addEventListener("webkitfullscreenchange", function () {
  if (document.webkitIsFullScreen == false) {
    document.getElementById('container2').style.height = "300px";
    document.getElementById('container2').style.width = "300px";
    document.getElementById('front').setAttribute('style', 'transform: translateZ(200px);');
    jwplayer("player1").resize(300,300);
    jwplayer("player2").resize(300,300);
    jwplayer("player3").resize(300,300);
    jwplayer("player4").resize(300,300);
    jwplayer("player5").resize(300,300);
    jwplayer("player6").resize(300,300);
  }
}, false);


function GetIEVersion() {
  var sAgent = window.navigator.userAgent;
  var Idx = sAgent.indexOf("MSIE");
  if (Idx > 0) {
  return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));
  } else if (!!navigator.userAgent.match(/Trident\/7\./)) {
  return 11;
  } else {
  return 0;
  }
}

var defaultAndroid = ((navigator.userAgent.indexOf('Mozilla/5.0') > -1 && navigator.userAgent.indexOf('Android ') > -1 &&     navigator.userAgent.indexOf('AppleWebKit') > -1) && !(navigator.userAgent.indexOf('Chrome') > -1));

if(window.opera || GetIEVersion() > 0 || defaultAndroid){
  document.getElementById('container').innerHTML = '<h1 style="font-family:arial;color:#fff;text-align:center;">This is an unsupported browser!</h1>';
  document.getElementById('btns').innerHTML = '';
}

if (navigator.userAgent.match(/iPhone/i) != null || navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.indexOf('Android ') > -1 || defaultAndroid){
  document.getElementById('btns').innerHTML = '';
}

// history.pushState({ page: 1 }, "title 1", "#_");
// window.onhashchange = function (event) {
//     window.location.hash = "_";
// };
