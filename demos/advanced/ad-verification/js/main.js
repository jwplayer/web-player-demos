var playerInstance = jwplayer("myElement");

playerInstance.on('adImpression',function(event){
  setElement("impression","The ad impression was fired.");
});

playerInstance.on('adSkipped',function(event){
  setElement("skip","The ad was skipped.");
});

playerInstance.on('adTime',function(event) {
  var remaining = Math.round(event.duration-event.position);
  setElement("progress","The ad completes in "+remaining+" seconds.");
});

playerInstance.on('adClick',function(event){
  setElement("click","The user clicked the ad.");
});

playerInstance.on('adComplete',function(event){
  setElement("complete","The ad was completely watched.");
});

function setElement(element,message){
  var div = document.getElementById(element);
  div.innerHTML = message;
  div.style.color = "#090";
}