jwplayer('container').setup ({
    file: 'https://569888080fa01.streamlock.net/live/jelly.stream/playlist.m3u8'
});

function loadMPD(a) {
    var o = {
      };
    var f = document.querySelector("input").value;
    if(f) o.file = f;
    jwplayer('container').setup(o);
  }

  document.querySelector("select").addEventListener("change",function(e){
    if(this.value) {
      document.querySelector("input").value = this.value;
      loadMPD(true);
      this.value = "";
    }
  },false);
  document.querySelector("form").addEventListener("submit",function(e){
    e.preventDefault();
    loadMPD(true);
  },false);
  document.querySelector("input").value = document.querySelector("select").options.item(1).value;
  loadMPD(false);
