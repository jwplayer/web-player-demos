let submitBtn = document.getElementById("check_live");
let liveStatus = document.getElementById("live_status");

submitBtn.addEventListener("click", () => {
	// grabs channel ID from input element
	let channelID = document.getElementById("channelID").value;

	// set up an interval (currently set to every 5 seconds) to check if JW Live Channels is live using our Delivery API
	livestreamCheck = setInterval(() => {
		fetch(`https://cdn.jwplayer.com/live/channels/${channelID}.json`)
			.then((data) => data.json())
			.then((response) => {
				//if the response contains an active status, embed a JW Player with the Live stream and clear interval
				if (response.status === "active") {
					liveStatus.innerHTML = "JW Live Channels is LIVE";
					let mediaid = response.current_event;
					jwplayer("player").setup({
						file: `https://cdn.jwplayer.com/live/events/${mediaid}.m3u8`,
						autostart: true,
					});
					clearInterval(livestreamCheck);
				} else {
					// otherwise display a message saying stream is not live yet
					liveStatus.innerHTML = "JW Live Channels is not live yet";

					// can add logic to display a dummy/placeholder video here as well
					// jwplayer('player').setup({file: "dummyfile.mp4"})
				}
			});
	}, 5000);
});
