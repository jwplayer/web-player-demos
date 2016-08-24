jwplayer('container').setup ({
    file: 'https://wowzaec2demo.streamlock.net/live/bigbuckbunny/playlist.m3u8'
});

function loadMPD(a) {
    var o = {
      type: 'hls',
      autostart: a,
      width: 640,
      height: 360,
              hlslabels: {
            "415": "128p",
            "515": "160p",
            "650": "208p",
            "881":"252p",
            "1200":"332p",
            "1600": "432p",
            "2300": "560p",
            "3200":"720p"
        }
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