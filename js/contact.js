let botonEnviar = document.querySelector("#send");


botonEnviar.addEventListener('click', (e) => {
	let name = document.querySelector('#name');
	let email = document.querySelector('#email');
	let subject = document.querySelector('#subject');
	let message = document.querySelector('#message');


	e.preventDefault();

	if (!/^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/.test(name.value)) {
		alert('Invalid name.');
		name.focus();
	}

	if (!/^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/.test(email.value)) {
		alert('Invalid e-mail.');
		email.focus();
	}

	if (!/^[a-zA-Z\s0-9\.\,\;\-\!\?\@\'\:\—\(\)\"]+$/.test(subject.value)) {
		alert('Invalid Subject.');
		subject.focus();
	}	

	if (!/^[a-zA-Z\s0-9\.\,\;\-\!\?\@\'\:\—\(\)\"]+$/.test(message.value)) {
		alert('Invalid message.');
		message.focus();
	}

	// console.log(e);



})

