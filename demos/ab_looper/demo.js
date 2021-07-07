let player = jwplayer("player");
let ab_button = document.getElementById("ab");
let count_ab = 0;

player.setup({ playlist: "https://cdn.jwplayer.com/v2/media/Vy0d8enA" });

player.on("ready", () => {
	//setting variables to use for A-B loop
	let count = 0;
	let pointA, pointB;
	let cues = [];
	//helper function to assist with tracking points A and B
	function looper() {
		if (count === 0) {
			pointA = player.getPosition();
			console.log("point A has been set: ", pointA);
			cues.push({ begin: pointA, text: "Point A" });
			count++;
		} else if (count === 1) {
			pointB = player.getPosition();
			console.log("point B has been set: ", pointB);
			cues.push({ begin: pointB, text: "Point B" });
			count++;

			//seek to point A when both have been set
			player.setCues(cues);
			player.seek(pointA);

			//logic to seek back to point A when player goes past point B or behind point A
			player.on("time", (data) => {
				if (data.position < pointA) {
					player.seek(pointA);
				}
				if (data.position > pointB) {
					player.seek(pointA);
				}
			});
			//logic to reset the loop
		} else if (count > 1) {
			count = 0;
			console.log("Points have been reset");
			player.off("time");
			cues = [];
			player.setCues([]);
		}
	}

	//add event listener on A-B button to call the looper function when clicked
	ab_button.addEventListener("click", () => {
		if (count_ab === 0) {
			count_ab++;
			ab_button.innerHTML = "Point A set. Select B set.";
			looper();
		} else if (count_ab === 1) {
			count_ab++;
			ab_button.innerHTML = "Stop Loop";
			looper();
		} else if (count_ab > 1) {
			count_ab = 0;
			ab_button.innerHTML = "A-B Loop";
			looper();
		}
	});
});
