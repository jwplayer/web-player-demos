const playerInstance = jwplayer('player');

playerInstance.setup({
  file: '//content.jwplatform.com/videos/3XnJSIm4-injeKYZS.mp4',
  fwassetid: 'jw_test_asset_g',
  duration: 500,
  advertising: {
    client: 'freewheel',
    freewheel: {
      networkid: 90750,
      // The 'adManagerUrl' specified below should
      // be the URL you receive from Freewheel.
      adManagerUrl: "https://mssl.fwmrm.net/p/jw_html5_test/AdManager.js",
      serverid: "https://demo.v.fwmrm.net/ad/g/1",
      profileid: "90750:jw_html5_test",
      sectionid: "jw_test_site_section"
    },
    adscheduleid: '12345',
    schedule: {
      adbreak: {
        offset: 'pre',
        tag: 'placeholder_preroll'
      }
    },
    vpaidcontrols: true,
    skipoffset: 3
  }
});