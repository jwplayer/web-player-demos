var playerInstance = jwplayer("myElement");
let streamType = "vod";

const configs = {
    "vod": {
        "playlist": [
            {
                "file": "//content.jwplatform.com/manifests/Qlh3p9ly.m3u8",
                "daiSetting": {
                    "cmsID": "19823",
                    "videoID": "ima-test"
                }
            }
        ],
        "advertising": {
            "client": "dai",
        }
    },
    "live": {
        "playlist": [
            {
                "file": "//content.jwplatform.com/manifests/Qlh3p9ly.m3u8",
            }
        ],
        "advertising": {
            "client": "dai",
            "assetKey": "sN_IYUG8STe1ZzhIIE_ksA"
        }
    }
};

function setupPlayer() {
    playerInstance.setup(configs[streamType]);
}

function setupListeners() {
    const select = document.getElementById("streamTypeSelect");
    select.addEventListener("change", swapCodeBlocks, false);
}

function swapCodeBlocks(event) {
    oldStreamType = streamType;
    streamType = event.target.value;
    
    setupPlayer();

    document.getElementById(streamType).style.display = "block";
    document.getElementById(oldStreamType).style.display = "none";
}


setupListeners();

setupPlayer();