var styleObject= {};

function update(style, value) {
	console.log(style +", "+ value)
	styleObject[style] = value;
    jwplayer().setCaptions(styleObject);
}

jwplayer().on('ready', function(event){
jwplayer().play(true);
});

jwplayer().on('firstFrame', function(event){
jwplayer().seek(1);
jwplayer().setCurrentCaptions(1)
jwplayer().pause(true);
});