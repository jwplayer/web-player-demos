var player = jwplayer("player");

player.setup({
    file: '//content.jwplatform.com/videos/1g8jjku3-cIp6U8lV.mp4',
    image: '//content.jwplatform.com/thumbs/1g8jjku3-720.jpg',
});

player.on('time', function(e) {
    $cookie.setItem('resumevideodata', Math.floor(e.position) + ':' + player.getDuration());
});

player.on('ready', function() {
    var cookieData = $cookie.getItem('resumevideodata');
    if(cookieData) {
        var resumeAt = cookieData.split(':')[0],
            videoDur = cookieData.split(':')[1];
        if(parseInt(resumeAt) < parseInt(videoDur)) {
            player.seek(resumeAt);
            logMessage('Resuming at ' + resumeAt); //for demo purposes
        }
        else if(cookieData && !(parseInt(resumeAt) < parseInt(videoDur))) {
            logMessage('Video ended last time! Will skip resume behavior'); //for demo purposes
        }
    }
    else {
        logMessage('No video resume cookie detected. Refresh page.');
    }
});
