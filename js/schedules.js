let apiURL = "https://api.tvmaze.com/schedule?country=US&date=";

let boton = document.querySelector('#search');
let botonTop = document.querySelector("#go-top");


boton.addEventListener('click', (e) => {
	let xhr;
	let dateValue = document.querySelector('#series-name');

	e.stopPropagation();
	e.preventDefault();


	xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		let response;
		let schedSection = document.querySelector('#schedules');
		let seriesTime ="";
		let timeArray = [];

		if (this.readyState == 4) {
			if (this.status == 200) {
				console.log(JSON.parse(this.responseText));
				response = JSON.parse(this.responseText);


				// for (i in response) {
				// 	if (seriesTime != response[i].airtime.substring(0, 2)) {
				// 		seriesTime = response[i].airtime.substring(0, 2)
				// 		timeArray.push(seriesTime);
				// 	} 
				// }
				// console.log(timeArray);
				
				// schedSection.innerHTML = `
				// 	<table id="series-sched">
				// 		<thead>
				// 			<th>
							
				// 			</th>
				// 		</thead>
						
				// `

				schedSection.innerHTML = "";
				for (i in response) {
					schedSection.innerHTML += `
						<div class="schedule-content" >
							<div class="time">
								<div class="header">
									<h3>Time</h3>
								</div>
								<div class="content">
									${response[i].airtime}
								</div>
								
							</div>
							<div class="show-date">
								<div class="header">
									<h3>Air Date</h3>
								</div>
								<div class="content">
									${formatDate(response[i].airdate.substr(0,10))}
								</div>
							</div>
							<div class="show-name">
								<div class="header">
									<h3>Name of the Show</h3>
								</div>
								<div class="content">
									${response[i].show.name}
								</div>
							</div>
							<div class="show-network">
								<div class="header">
									<h3>Network</h3>
								</div>
								<div class="content">
									${validateNetwork(response[i].show.network)}
								</div>
							</div>
							<div class="show-episode">
								<div class="header">
									<h3>Season - Episode</h3>
								</div>
								<div class="content">
									${response[i].season+" x "+response[i].number}
								</div>
							</div>	
							<div class="show-epname">
								<div class="header">
									<h3>Episode Name</h3>
								</div>
								<div class="content">
									${response[i].name}
								</div>
							</div>	
							<div class="show-epsummary">
								<div class="header">
									<h3>Episode Summary</h3>
								</div>
								<div class="content">
									${validateSummary(response[i].summary).trim()}
								</div>
							</div>
						</div>
					`; 					

				// 	schedSection.innerHTML = `${response[i].airdate}`
				}

				// schedSection.innerHTML += `
				// 	</table>
				// `


			} else if (this.status == 0) {
				schedSection.innerHTML = `
					<div class="schedule-content" >
						<div class="content">
							Error stablishing connection to API Server.
						</div>
					</div>`;
				console.log("Error stablishing connection. ",this.status, this.statusText);
       			// console.log("Error stablishing connection. ", this.statusText)
       		} else {
       			console.log("Error", this.statusText)
       		
       		}
		} else {
			schedSection.innerHTML = `
				<div class="loader">
				
				</div>
			`;
		}
	}
	// console.log(apiURL+dateValue.value);



	xhr.open('GET',apiURL+dateValue.value,true);
	xhr.send();
	
});

function formatDate(date) {
	let fecha = new Date(date);
	// console.log(fecha);

	MyDateString = ('0' + (fecha.getMonth()+1)).slice(-2) + '/'
             + ('0' + (fecha.getDate() +1)).slice(-2) + '/'
             + fecha.getFullYear();
    // console.log(MyDateString);
    return MyDateString;
}
function validateNetwork(network) {
	if (network == null) {
		return '';
	} else {
		return network.name;
	}
}

function validateSummary(summary) {
	if (summary == null) {
		return 'No Summary Provided';
	} else {
		return summary;
	}
}

botonTop.addEventListener('click', () => {
	document.body.scrollTop = 0; // For Chrome, Safari and Opera 
    document.documentElement.scrollTop = 0; // For IE and Firefox
});

window.onscroll = function() {
	scrollFunction();
}

scrollFunction = () => {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		botonTop.style.display = 'block';
	} else {
		botonTop.style.display = 'none';
	}
}