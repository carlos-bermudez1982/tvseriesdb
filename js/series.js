let apiURL = "http://api.tvmaze.com/";

let divSeries = document.querySelector(".series");
let boton = document.querySelector("#go-top");


document.addEventListener("DOMContentLoaded", function(event) {
	loadSeries();
});


function loadSeries() {
	let xhr;
	let response;
	
	xhr = new XMLHttpRequest();

	
	// debugger;
	xhr.onreadystatechange = function() {
		let section;


		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.responseText);
			divSeries.innerHTML = '';
			
			function sortResults(prop, asc) {
			    response = response.sort(function(a, b) {
			        if (asc) {
			            return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
			        } else {
			            return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
			        }
			    });
		    }
		 

			sortResults('name', true);
			// console.log(response);
			
			for (i in response) {
				// console.log(`${response[i].name}`.substring(0,1));

				if (/[0-9]/.test(`${response[i].name}`.substring(0,1)) && section!='0-9') {
					divSeries.innerHTML += `
						

							<div class="series-section">
								<h2 class="letter" name="0-9Series" id="0-9Series">0-9</h2>
								<hr />
							</div>
						
					`;
					section = '0-9'
				} else if (/[A-Za-z]/.test(`${response[i].name}`.substring(0,1)) && section!=`${response[i].name}`.substring(0,1)) {
					section = `${response[i].name}`.substring(0,1);
					divSeries.innerHTML += `
						<div class="series-section">
							<h2 class="letter" name="`+section.trim()+`Series" id="`+section.trim()+`Series">`+section+`</h2>
							<hr />
						</div>
						`
					;
					// <a id="return-top" href="#series-nav">Go Top</a>
					// console.log(divSeries);
					// console.log(`${response[i].name}`.substring(0,1));
					
				}

				divSeries.innerHTML += `
						<div class="tv-series">
							<a id="${response[i].id}" class="series-link" href="#">
								<img src="${response[i].image.medium}" alt="${response[i].name}">
							</a>
							<div class="series-title">
								<h3>${response[i].name}</h3>
							</div>
						</div>
					`;
			

			}
			
			seriesLink(response);
		} else {
			divSeries.innerHTML = `
				<div class="loader">
				
				</div>
			`;
		}
	}

	// console.log(JSON.parse(response));
	xhr.open('GET',apiURL+'shows',true);
	xhr.send();

	

}


// console.log(seriesLinks);


function seriesLink(objeto) {
	let seriesLinks = document.querySelectorAll('.series-link');
	let modal = document.querySelector('#series-info');
	let modalContent = document.querySelector('.modal-body');
	let modalHeader = document.querySelector('.modal-header');
	let modalFooter = document.querySelector('.modal-footer');
	let close  = document.querySelector('#close');
	let idSeries;
	let seriesData;
	let seasons;
	// console.log(seriesLinks);
	for (let i=0; i < seriesLinks.length; i++) {
		// console.log(1);
		seriesLinks[i].addEventListener('click', (e) => {
			e.preventDefault();
			idSeries = e.target.parentNode.id;
			modal.style.display = 'block';

			seriesData = objeto.filter(serie => {
				if (serie.id == idSeries) {
					return serie
				}
			});

			// console.log(seasons);
			seriesData = seriesData[0];
			// console.log(seriesData);
			// console.log(seriesData);
			// console.log(idSeries);

			

			// console.log(seasons);

			modalHeader.innerHTML = `
				<div class="series-header"> 
					<h2>${seriesData.name}</h2>
				</div>
				<div id="close">&times;</div>
				
			`

			modalContent.innerHTML = `
				<div class="series-image">
					<img src="${seriesData.image.original}" alt="${seriesData.name}" >
				</div>
				<div class="summary">
					<b>Summary: </b>${seriesData.summary}
					<div class="genres">
						<b>Genres: </b>${seriesData.genres.toLocaleString()}
					</div>
					<div class="network">
						<b>Network: </b>${validateNetwork(seriesData.network)}
					</div>
					<div class="released">
						<b>Release Date: </b>${formatDate(seriesData.premiered)}
					</div>
					<div class="rating">
						<b>Rating: </b>${seriesData.rating.average}
					</div>
					<div class="site">
						<b>Official Site: </b> <a id="series-site" href="${validateSite(seriesData.officialSite)}" target="_blank">
							${validateSite(seriesData.officialSite)}
						</a> 
					</div>
					<div class="status">
						<b>Status: </b>${seriesData.status}
					</div>
				</div>

			`;

			getSeasons(seriesData.id);

		})
	}
	// console.log(idSeries)
	// console.log(idSeries);
	// getSeasons(idSeries);

	modalHeader.addEventListener('click', () => {
		modal.style.display = 'none';
		// console.log('entro');
	})

	modal.addEventListener('click', (e) => {
		if (e.target == modal) {
			modal.style.display = 'none';
		}
	});
	console.log(objeto);

}

function formatDate(date) {
	let fecha = new Date(date);
	// console.log(fecha);

	MyDateString = ('0' + (fecha.getMonth()+1)).slice(-2) + '/'
             + ('0' + (fecha.getDate() +1)).slice(-2) + '/'
             + fecha.getFullYear();
    // console.log(MyDateString);
    return MyDateString;
}

function validateSite(site) {
	if (site == null) {
		return '';
	} else {
		return site;
	}
}

function validateNetwork(network) {
	if (network == null) {
		return '';
	} else {
		return network.name;
	}
}



// funcion para obtener las temporadas de la serie.
function getSeasons(id) {
	let xhr;
	let response;
	let modalContent = document.querySelector('.summary');
	console.log(modalContent);

	xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		let section;

		if (this.readyState == 4 && this.status == 200) { 
			response = JSON.parse(this.responseText);
			
			modalContent.innerHTML += `
				<div class="seasons">
					<b>Seasons: </b>${response.length}
				</div>
			`;


			// return response;
		}
	}
	console.log(apiURL+'shows/'+id+'/seasons');
	xhr.open('GET', apiURL+'shows/'+id+'/seasons', true);
	xhr.send();

}


boton.addEventListener('click', () => {
	document.body.scrollTop = 0; // For Chrome, Safari and Opera 
    document.documentElement.scrollTop = 0; // For IE and Firefox
});

window.onscroll = function() {
	scrollFunction();
}

scrollFunction = () => {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		boton.style.display = 'block';
	} else {
		boton.style.display = 'none';
	}
}