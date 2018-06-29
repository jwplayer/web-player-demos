jwplayer("player").setup({
    file: "//content.jwplatform.com/videos/lWMJeVvV-52qL9xLP.mp4",
    image: '//content.jwplatform.com/thumbs/lWMJeVvV-480.jpg',
    autostart: false,
	tracks: [{
		file:'assets/chapters.txt',
		kind:'chapters'
	}]
});
jwplayer().on('ready', function(event) {
  if (navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPhone/i) != null){
	document.getElementById('map').style.display = 'none';
  }
});
var theStatue = false;
var thePark = false;
var theWtc = false;
var theRock = false;
var theTimes = false;
var theCh = false;
var theStatue2 = false;
var thePark2 = false;
var theWtc2 = false;
var theRock2 = false;
var theTimes2 = false;
var theCh2 = false;
jwplayer().on('time', function(event){
	if (event.position >= 12 && event.position < 29 && theStatue == false) {
		document.getElementById('statue').style.display = "inline";
		document.getElementById('central').style.display = "none";
		document.getElementById('wtc').style.display = "none";
		document.getElementById('rock').style.display = "none";
		document.getElementById('times').style.display = "none";
		document.getElementById('ch').style.display = "none";
		theStatue = true;
		thePark = false;
		theWtc = false;
		theRock = false;
		theTimes = false;
		theCh = false;
	}
	if (event.position >= 30 && event.position < 54 && thePark == false) {
		document.getElementById('statue').style.display = "none";
		document.getElementById('central').style.display = "inline";
		document.getElementById('wtc').style.display = "none";
		document.getElementById('rock').style.display = "none";
		document.getElementById('times').style.display = "none";
		document.getElementById('ch').style.display = "none";
		theStatue = false;
		thePark = true;
		theWtc = false;
		theRock = false;
		theTimes = false;
		theCh = false;
	}
	if (event.position >= 55 && event.position < 80 && theWtc == false) {
		document.getElementById('statue').style.display = "none";
		document.getElementById('central').style.display = "none";
		document.getElementById('wtc').style.display = "inline";
		document.getElementById('rock').style.display = "none";
		document.getElementById('times').style.display = "none";
		document.getElementById('ch').style.display = "none";
		theStatue = false;
		thePark = false;
		theWtc = true;
		theRock = false;
		theTimes = false;
		theCh = false;
	}
	if (event.position >= 81 && event.position < 95 && theRock == false) {
		document.getElementById('statue').style.display = "none";
		document.getElementById('central').style.display = "none";
		document.getElementById('wtc').style.display = "none";
		document.getElementById('rock').style.display = "inline";
		document.getElementById('times').style.display = "none";
		document.getElementById('ch').style.display = "none";
		theStatue = false;
		thePark = false;
		theWtc = false;
		theRock = true;
		theTimes = false;
		theCh = false;
	}
	if (event.position >= 96 && event.position < 119 && theTimes == false) {
		document.getElementById('statue').style.display = "none";
		document.getElementById('central').style.display = "none";
		document.getElementById('wtc').style.display = "none";
		document.getElementById('rock').style.display = "none";
		document.getElementById('times').style.display = "inline";
		document.getElementById('ch').style.display = "none";
		theStatue = false;
		thePark = false;
		theWtc = false;
		theRock = false;
		theTimes = true;
		theCh = false;
	}
	if (event.position >= 120 && event.position < 139 && theCh == false) {
		document.getElementById('statue').style.display = "none";
		document.getElementById('central').style.display = "none";
		document.getElementById('wtc').style.display = "none";
		document.getElementById('rock').style.display = "none";
		document.getElementById('times').style.display = "none";
		document.getElementById('ch').style.display = "inline";
		theStatue = false;
		thePark = false;
		theWtc = false;
		theRock = false;
		theTimes = false;
		theCh = true;
	}
});
jwplayer().on('complete', function(){
	map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: new google.maps.LatLng(40.7390615, -73.999231),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
	infowindow = new google.maps.InfoWindow();
    marker, i;
    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
		  if(locations[i][0] == "Statue of Liberty"){
			jwplayer().seek(12);
		  }
		  if(locations[i][0] == "Central Park"){
			jwplayer().seek(30);
		  }
		  if(locations[i][0] == "World Trade Center"){
			jwplayer().seek(55);
		  }
		  if(locations[i][0] == "Rockefeller Center"){
			jwplayer().seek(80);
		  }
		  if(locations[i][0] == "Times Square"){
			jwplayer().seek(96);
		  }
		  if(locations[i][0] == "Chrysler Building"){
			jwplayer().seek(120);
		  }
        }
      })(marker, i));
    }
});

var locations = [
      ['Statue of Liberty', 40.6892, -74.0444, 6],
      ['Central Park', 40.7789, -73.9675, 5],
      ['World Trade Center', 40.7117, -74.0125, 4],
      ['Rockefeller Center', 40.7586, -73.9792, 3],
      ['Times Square', 40.7577, -73.9857, 2],
	  ['Chrysler Building', 40.7517, -73.9753, 1]
    ];
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: new google.maps.LatLng(40.7390615, -73.999231),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    var statueLocation = new google.maps.Marker({position: new google.maps.LatLng(40.6892, -74.0444),map: map});
	var centralLocation = new google.maps.Marker({position: new google.maps.LatLng(40.7789, -73.9675),map: map});
	var worldLocation = new google.maps.Marker({position: new google.maps.LatLng(40.7117, -74.0125),map: map});
	var rockLocation = new google.maps.Marker({position: new google.maps.LatLng(40.7586, -73.9792),map: map});
	var timesLocation = new google.maps.Marker({position: new google.maps.LatLng(40.7577, -73.9857),map: map});
	var chLocation = new google.maps.Marker({position: new google.maps.LatLng(40.7517, -73.9753),map: map});

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
		  if(locations[i][0] == "Statue of Liberty") {
			jwplayer().seek(12);
		  }
		  if(locations[i][0] == "Central Park") {
			jwplayer().seek(30);
		  }
		  if(locations[i][0] == "World Trade Center") {
			jwplayer().seek(55);
		  }
		  if(locations[i][0] == "Rockefeller Center") {
			jwplayer().seek(80);
		  }
		  if(locations[i][0] == "Times Square") {
			jwplayer().seek(96);
		  }
		  if(locations[i][0] == "Chrysler Building") {
			jwplayer().seek(120);
		  }
        }
      })(marker, i));
    }

	jwplayer().on('time', function(event){
		if (event.position >= 12 && event.position < 29 && theStatue2 == false) {
			infowindow.setContent(locations[0][0]);
			infowindow.open(map,statueLocation);
			map.setZoom(15);
			theStatue2 = true;
			thePark2 = false;
			theWtc2 = false;
			theRock2 = false;
			theTimes2 = false;
			theCh2 = false;
		}
		if (event.position >= 30 && event.position < 54 && thePark2 == false) {
			infowindow.setContent(locations[1][0]);
			infowindow.open(map,centralLocation);
			map.setZoom(15);
			theStatue2 = false;
			thePark2 = true;
			theWtc2 = false;
			theRock2 = false;
			theTimes2 = false;
			theCh2 = false;
		}
		if (event.position >= 55 && event.position < 80 && theWtc2 == false) {
			infowindow.setContent(locations[2][0]);
			infowindow.open(map,worldLocation);
			map.setZoom(15);
			theStatue2 = false;
			thePark2 = false;
			theWtc2 = true;
			theRock2 = false;
			theTimes2 = false;
			theCh2 = false;
		}
		if (event.position >= 81 && event.position < 95 && theRock2 == false) {
			infowindow.setContent(locations[3][0]);
			infowindow.open(map,rockLocation);
			map.setZoom(15);
			theStatue2 = false;
			thePark2 = false;
			theWtc2 = false;
			theRock2 = true;
			theTimes2 = false;
			theCh2 = false;
		}
		if (event.position >= 96 && event.position < 119 && theTimes2 == false) {
			infowindow.setContent(locations[4][0]);
			infowindow.open(map,timesLocation);
			map.setZoom(15);
			theStatue2 = false;
			thePark2 = false;
			theWtc2 = false;
			theRock2 = false;
			theTimes2 = true;
			theCh2 = false;
		}
		if (event.position >= 120 && event.position < 139 && theCh2 == false) {
			infowindow.setContent(locations[5][0]);
			infowindow.open(map,chLocation);
			map.setZoom(15);
			theStatue2 = false;
			thePark2 = false;
			theWtc2 = false;
			theRock2 = false;
			theTimes2 = false;
			theCh2 = true;
		}
	});

	var hasPlayed = false;

	jwplayer().on('beforePlay', function(event) {
		if(hasPlayed === false){
			ga('send', 'event', 'Video', 'Play');
			hasPlayed = true;
		}
	});
