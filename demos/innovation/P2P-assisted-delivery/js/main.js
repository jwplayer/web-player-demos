
jwplayer.key = "dtUZ5gcdkcfq2WnsdIl53C5vp3N0AvC3";

 var init = function () {

     jwplayer('streamroot-player')
     .setup({
         playlist : [{
             file: "//wowza.streamroot.io/liveorigin/stream4/playlist.m3u8"
         }],
         p2pConfig:{
             streamrootKey: "sr-ewok",
             debug: true,
         },
         hlsjsConfig : {
            liveSyncDuration: 40, 
            liveMaxLatencyDuration: 80
         },
        logo: {
            file: './assets/logo.png',
            link: 'http://streamroot.io',
            position :'top-left'
        },
         width: 600,
         height: 400,
         autostart: true
     });

 };

 init();



