var playerInstance = jwplayer("myElement")
let mediationLayer = "dfp"

const configs = {
    "jwp": {
            "file": "https://content.jwplatform.com/videos/1g8jjku3-cIp6U8lV.mp4",
            "image": "http://d3el35u4qe4frz.cloudfront.net/bkaovAYt-480.jpg",
            "advertising": {
                "client": "googima",
                "schedule": {
                    "adBreak": {
                        "tag": "//pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=sample_ct%3Dskippablelinear&correlator=",
                        "offset": "pre"
                    }
                },
                "bids": {
                    "settings": {
                        "mediationLayerAdServer": "jwp",
                        "floorPriceCents": 2,
                        "floorPriceCurrency": "usd",
                        "bidTimeout": 1000
                    },
                    "bidders": [
                        {
                            "name": "SpotX",
                            "id": "85394"
                        }
                    ]
                }
            }
        },
    "dfp": {
        "file": "https://content.jwplatform.com/videos/1g8jjku3-cIp6U8lV.mp4",
        "image": "http://d3el35u4qe4frz.cloudfront.net/bkaovAYt-480.jpg",
        "advertising": {
            "client": "googima",
            "schedule": {
                "adBreak": {
                    "tag": "//pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/137679306/HB_Dev_Center_Example&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&correlator=",
                    "offset": "pre"
                }
            },
            "bids": {
                "settings": {
                    "mediationLayerAdServer": "dfp",
                    "floorPriceCents": 2,
                    "floorPriceCurrency": "usd",
                    "bidTimeout": 1000
                },
                "bidders": [
                    {
                        "name": "SpotX",
                        "id": "85394"
                    }
                ]
            }
        }
    }
}

function setupPlayer() {
    playerInstance.setup(configs[mediationLayer]);

    
    playerInstance.on("adImpression",function(event){
        console.log(winner(event));
        setElement("impression", "The ad impression was fired. SpotX did " + (winner(event) ?  '' : 'NOT') + " win the bidding.", "#090");
    });

    playerInstance.on("adBidRequest",function(event){
        setElement("bid-request", "The ad Bid Request was fired.", "#090");
    });

    playerInstance.on("adBidResponse",function(event){
        setElement("bid-response", "The ad Bid Response was fired.", "#090");
    });
}

function setupListeners() {
    const select = document.getElementById("mediationLayerSelect");
    select.addEventListener("change", swapCodeBlocks, false);
}

function setElement(element,message, color){
    var div = document.getElementById(element);
    div.innerHTML = message;
    div.style.color = color;
}

function winner(event){
    let isWinner = false;
    if(!event.bidders) return false;
    if (event.mediationLayerAdServer === "dfp") {
        if (event.adsystem === "SpotXchange") {
            isWinner = true;
        }
        return isWinner;
    } else { 
        event.bidders.forEach((bidder) => {
            if (bidder.name === "SpotX" && bidder.winner) {
                isWinner = true;
            }
        });
        return isWinner;
    }
}

function clearLogs() {
    setElement("impression", "(no ad impression yet)", "#000")
    setElement("bid-request", "(no ad bid request yet)", "#000");
    setElement("bid-response", "(no ad bid response yet)", "#000");
}

function swapCodeBlocks(event) {
    oldMediationLayer = mediationLayer;
    mediationLayer = event.target.value;
    
    clearLogs();
    setupPlayer();

    document.getElementById(mediationLayer).style.display = "block";
    document.getElementById(oldMediationLayer).style.display = "none";
}


setupListeners();

setupPlayer();