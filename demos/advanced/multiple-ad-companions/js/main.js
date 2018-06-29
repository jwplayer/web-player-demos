var playerInstance = jwplayer("myElement");
playerInstance.setup({
"playlist": 'https://cdn.jwplayer.com/v2/media/ioyt59Zj',
"title": "Elephant's Dream",
"width": 567,
"height": 318,
"advertising": {
  "tag": "//traffick.jivox.com/jivox/serverAPIs/getCampaignById.php?api=vast&version=2.0&siteId=94d5ae29c87442&campaignId=21411&r=__random-number__",
  "client": "vast"
  }
});

playerInstance.on('adCompanions', function(event) {
  for(var i=0; i<event.companions.length; i++) {
    var entry = event.companions[i];
    if(entry.width == 728) {
      insertAd("topAd",entry.resource,entry.click);
    } else if(entry.width == 160) {
     insertAd("leftAd",entry.resource,entry.click);
    } else if(entry.height == 32) {
     insertAd("bottomAd",entry.resource,entry.click);
    } else if(entry.height == 250) {
     insertAd("rightAd",entry.resource,entry.click);
    }
   }
});

function insertAd(element,resource,clickthrough) {
var div = document.getElementById(element);
div.innerHTML = "<a href='"+clickthrough+"'><img src='"+resource+"'/></a>";
}
