async function requester(url) {
    const response = await fetch(url,
    {
        method: 'GET',
    });
    const data = await response.json();
    return data.menu[0].lunch;
}

Module.register("schoolmeal", {
	defaults: {
		updateInterval: 25000,
		remoteFile: null,
		fadeSpeed: 2500,
	},
	lastIndexUsed: -1,

	getScripts: function () {
		return ["moment.js"];
	},

	getStyles: function () {
		return ["modules/schoolmeal/schoolmeal_style.css"];
	},

	start: function () {
		Log.info("Starting module: " + this.name);
		
		if (this.config.remoteFile !== null) {
			this.complimentFile((response) => {
				this.config.compliments = JSON.parse(response);
				this.updateDom();
			});
		}

		setInterval(() => {
			this.updateDom(this.config.fadeSpeed);
		}, this.config.updateInterval);
	},

	getDom: async function () {
		let today = new Date();   
		let year = today.getFullYear(); // 년도
		let month = today.getMonth() + 1;  // 월
		let date = today.getDate();  // 날짜

		let url = 'https://schoolmenukr.ml/api/middle/C100000972?year=' + String(year) + '&month=' + String(month) + '&date=' + String(date);

		const wrapper = document.createElement("div");
		wrapper.className = "thin xlarge bright";
		const complimentText = await requester(url);
		console.log(complimentText)
		const compliment = document.createElement("div")
		compliment.className = "thin menu bright";
		const title = document.createElement("a");
		title.textContent = "급식";
		title.appendChild(document.createElement("br"));
		title.className = "regular normal title"
		for (let i = 0; i < complimentText.length; i++) {
			const plate = document.createElement("a")
			plate.appendChild(document.createTextNode(complimentText[i].replace(/[0-9.]/g,"")));
			plate.className = "menu-anime " + String(i);	
			plate.style.animationDelay = String(i / 10) + "s"
			compliment.appendChild(plate);
			compliment.appendChild(document.createElement("br"));
		}

		compliment.style.lineHeight = String(1200 / complimentText.length) + "%";  

		wrapper.appendChild(title);
		wrapper.appendChild(compliment);

		return wrapper;
	}
});
