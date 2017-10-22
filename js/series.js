let apiURL = "http://api.tvmaze.com/shows";
let xhr;
let divSeries = document.querySelector(".series");


// document.addEventListener('load', function() {
	xhr = new XMLHttpRequest();

	
	// debugger;
	xhr.onreadystatechange = function() {
		
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
			console.log(response);
			
			for (i in response) {
				divSeries.innerHTML += `
						<div class="tv-series">
							<h3>${response[i].name}</h3>
							<img src="${response[i].image.medium}">
						</div>
					`;
			}
		} else {
			divSeries.innerHTML = 'Cargando ...';
		}
	}

	// console.log(JSON.parse(response));
	xhr.open('GET',apiURL,true);
	xhr.send();



    // showResults();
