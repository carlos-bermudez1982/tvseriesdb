let botonEnviar = document.querySelector("#send");
let botonReset  = document.querySelector("#reset");
let nombre, correo, mensaje;

botonEnviar.addEventListener('click', (e) => {
	let name = document.querySelector('#name');
	let email = document.querySelector('#email');
	let subject = document.querySelector('#subject');
	let message = document.querySelector('#message');


	e.preventDefault();

	if (!/^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/.test(name.value)) {
		alert('Invalid name.');
		name.focus();
	} else if (!/^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/.test(email.value)) {
		alert('Invalid e-mail.');
		email.focus();
	} else if (!/^[a-zA-Z\s0-9\.\,\;\-\!\?\@\'\:\—\(\)\"]+$/.test(subject.value)) {
		alert('Invalid Subject.');
		subject.focus();
	} else if (!/^[a-zA-Z\s0-9\.\,\;\-\!\?\@\'\:\—\(\)\"]+$/.test(message.value)) {
		alert('Invalid message.');
		message.focus();
	} else {
		if (enviarMensaje(name.value, subject.value, email.value, message.value)) {
			alert('Message sent succesfully!');
			botonReset.click();
		} else {
			alert('Error while sending your message!, please try again.');
		}
	}

	// console.log(e);

})


emailjs.init("user_YePRh9nBULjuFRwgGigRp");

function enviarMensaje(name, subject, email, message){

	if (emailjs.send("gmail","template_jcMprvFp",{to_name: 'Carlos Bermudez', from_email: email, from_name: name, to_email: 'cbermudez1982@gmail.com', message_html: message, to_subject: subject})) {
		return true;
	} else {
		return false;
	}

}
