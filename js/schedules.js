let apiURL = "http://api.tvmaze.com/schedule?country=US&date=";

let boton = document.querySelector('#search');





boton.addEventListener('click', (e) => {
	let xhr;
	let dateValue = document.querySelector('#series-name');

	e.stopPropagation();
	e.preventDefault();


	xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				console.log(JSON.parse(this.responseText));
			} else {
       			console.log("Error", this.statusText)
       		}
		}
	}
	console.log(apiURL+dateValue.value);
	xhr.open('GET',apiURL+dateValue.value,true);
	xhr.send();
	
});