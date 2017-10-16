var titleHTML = document.getElementById('title');
var artistHTML = document.getElementById('artist');
var imageHTML = document.getElementById('image');

// Setting up the player with an HLS stream that includes timed metadata
var playerInstance = jwplayer("metaData");
playerInstance.setup({
	file: 'assets/index.m3u8',
});

// Retrieving metadata
playerInstance.on('meta', function(event){
	var thisTitle = event.metadata.title;
	var thisArtist = event.metadata.artist;
	var thisImage = event.metadata.url;
	console.log(event.metadata);

	if(thisTitle){
	titleHTML.innerHTML= thisTitle;
		}
	if(thisArtist){
	artistHTML.innerHTML= thisArtist;
		}
	if(thisImage){
	imageHTML.innerHTML= '<img src="'+thisImage+'"/>';
		}
});
