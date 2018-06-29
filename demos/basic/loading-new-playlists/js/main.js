//Define our three playlist arrays

var playlistOne = [{
"file": "//content.jwplatform.com/videos/iLwfYW2S-cIp6U8lV.mp4",
"image":"//content.jwplatform.com/thumbs/iLwfYW2S-720.jpg",
"title": "Road Trip"
}];

var playlistTwo = [{
"file": "//content.jwplatform.com/videos/8TbJTFy5-cIp6U8lV.mp4",
"image":"//content.jwplatform.com/thumbs/8TbJTFy5-720.jpg",
"title": "Hiking on the Edge"
}];

var playlistThree = [{
"file":"//content.jwplatform.com/videos/RDn7eg0o-cIp6U8lV.mp4",
"image":"//content.jwplatform.com/thumbs/RDn7eg0o-720.jpg",
"title": "Surfing Ocean Wave"
},{
"file": "//content.jwplatform.com/videos/tkM1zvBq-cIp6U8lV.mp4",
"image": "//content.jwplatform.com/thumbs/tkM1zvBq-720.jpg",
"title": "Surfers at Sunrise"
},{
"file": "//content.jwplatform.com/videos/i3q4gcBi-cIp6U8lV.mp4",
"image":"//content.jwplatform.com/thumbs/i3q4gcBi-720.jpg",
"title": "Road Cycling Outdoors"
}];

//Create a function to load a playlist var
function loadPlaylist(thePlaylist) {
	jwplayer().load(thePlaylist);
}
