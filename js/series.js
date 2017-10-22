let apiURL = "http://api.tvmaze.com/shows";
let xhr;
let divSeries = document.querySelector(".series");
let response;


document.addEventListener("DOMContentLoaded", function(event) {
	loadSeries();
});


function loadSeries() {

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
								
							</div>
						
					`;
					section = '0-9'
				} else if (/[A-Za-z]/.test(`${response[i].name}`.substring(0,1)) && section!=`${response[i].name}`.substring(0,1)) {
					section = `${response[i].name}`.substring(0,1);
					divSeries.innerHTML += `
						<div class="series-section">
							<h2 class="letter" name="`+section.trim()+`Series" id="`+section.trim()+`Series">`+section+`</h2>
							<a id="return-top" href="#series-nav">Go Top</a>
						</div>
						`
					;
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
	xhr.open('GET',apiURL,true);
	xhr.send();

	

}


// console.log(seriesLinks);


function seriesLink(objeto) {
	let seriesLinks = document.querySelectorAll('.series-link');
	let modal = document.querySelector('#series-info');
	let modalContent = document.querySelector('.modal-content');
	let span  = document.querySelector('.close');
	let idSeries;
	let seriesData;
	// console.log(seriesLinks);
	for (let i=0; i < seriesLinks.length; i++) {
		// console.log(1);
		seriesLinks[i].addEventListener('click', (e) => {
			e.preventDefault();
			idSeries = e.target.parentNode.id;
			modal.style.display = 'block';

			seriesData = JSON.stringify(objeto.filter(serie => {
				if (serie.id == idSeries) {
					return serie
				}
			}));

			console.log(seriesData.id);

			// modalContent.innerHTML = `
			// 	<div class="series-image">
			// 		<img src="${seriesData.image.original}" alt="${seriesData.name}" />
			// 	</div>
			// `;



		})
	}

	span.addEventListener('click', () => {
		modal.style.display = 'none';
	})

	modal.addEventListener('click', (e) => {
		if (e.target == modal) {
			modal.style.display = 'none';
		}
	});
	console.log(objeto);

}


    // showResults();
