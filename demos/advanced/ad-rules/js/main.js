// Add your JavaScript here
const playerInstance = jwplayer('player');
let explanationText = document.getElementById('explanation');
const startOn = document.getElementById('startOn');
const frequency = document.getElementById('frequency');

function setupPlayer(startOnValue, frequencyValue) {
	playerInstance.setup({
		playlist: 'https://cdn.jwplayer.com/v2/playlists/JGKehvy1',
		advertising: {
			client: 'vast',
			tag: 'assets/preroll.xml',
			rules: {
				startOn: startOnValue,
				frequency: frequencyValue
			}
		}
	});
}

function updateExplanation(startOnValue, frequencyValue) {
	let startOnText, frequencyText;

	switch (startOnValue) {
		case 1:
			startOnText= 'first';
			break;
		case 2:
			startOnText = 'second';
			break;
		case 3:
			startOnText = 'third';
			break;
		case 4:
			startOnText = 'fourth';
			break;
	}

	switch (frequencyValue) {
		case 0:
			break;
		case 1:
			frequencyText = 'single';
			break;
		case 2:
			frequencyText = 'other';
			break;
		case 3:
 			frequencyText= 'third';
			break;
	}

	if (frequencyValue !== 0) {
		explanationText.innerHTML = 'These rules will result in the player playing ads every <span>' + frequencyText + '</span> playlist item, starting with the <span>' + startOnText + '</span>.';
	} else {
		explanationText.innerHTML = 'Because the <span>frequency</span> ad rule is set to <span>0</span>, the ad will only play before the first playlist item. It will not play on subsequent playlist items. The value for <span>startOn</span> has no effect.';
	}
}

setupPlayer(1, 1);

document.getElementById('setupPlayerButton').addEventListener('click', function(e) {
	e.preventDefault();
	const startOnValue = parseInt(startOn.options[startOn.selectedIndex].value);
	const frequencyValue = parseInt(frequency.options[frequency.selectedIndex].value);

	setupPlayer(startOnValue, frequencyValue);
	updateExplanation(startOnValue, frequencyValue);
});

window.onbeforeunload = function() {
	startOn.selectedIndex = 0;
	frequency.selectedIndex = 1;
};
