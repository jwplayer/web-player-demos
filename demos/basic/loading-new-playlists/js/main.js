//Define our three playlist arrays

var playlistOne = [{
"file": "//content.jwplatform.com/videos/C4lp6Dtd-640.mp4", 
"image": "//content.jwplatform.com/thumbs/C4lp6Dtd-640.jpg", 
"title": "Tears of Steel"
}];

var playlistTwo = [{
"file": "//content.jwplatform.com/videos/bkaovAYt-640.mp4", 
"image":"//content.jwplatform.com/thumbs/bkaovAYt-640.jpg", 
"title": "Big Buck Bunny"
}];

var playlistThree = [{
"file":"//content.jwplatform.com/videos/kaUXWqTZ-640.mp4", 
"image":"//content.jwplatform.com/thumbs/kaUXWqTZ-640.jpg", 
"title": "Elephant's Dream"
},{
"file": "//content.jwplatform.com/videos/C4lp6Dtd-640.mp4", 
"image": "//content.jwplatform.com/thumbs/C4lp6Dtd-640.jpg", 
"title": "Tears of Steel"
},{
"file": "//content.jwplatform.com/videos/bkaovAYt-640.mp4", 
"image":"//content.jwplatform.com/thumbs/bkaovAYt-640.jpg", 
"title": "Big Buck Bunny"
}];

//Create a function to load a playlist var
function loadPlaylist(thePlaylist) {
	jwplayer().load(thePlaylist)
}