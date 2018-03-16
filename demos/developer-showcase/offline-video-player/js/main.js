window.onload = function () {
			
			var api,
				container = document.getElementById("player"),
				fileElem = document.getElementById("file");


			fileElem.onchange = function () {
				var file = fileElem.files[0]
				var clip = URL.createObjectURL(file);

					if (api === undefined) {
						api = jwplayer("player").setup({
							"title": file.name,
							"file": clip,
							"autostart": "true",
							"stretching": "exactfit",
							"type": file.type,
							"width": "854px",
							"height": "480px"
						});

					} 
					
					else {
						jwplayer().load([{"file": clip, "title": file.name, "type": file.type}]);

					}
				
			};
			
		};