let botonMenu = document.querySelector('.icon'); 


botonMenu.addEventListener('click', (e) => {
	let menuItems = document.querySelectorAll('#menu-item');

	console.log(menuItems);


	for (let i=0; i < menuItems.length; i++) {
		// console.log(i);
		if (menuItems[i].classList.contains('responsive')) {
			// console.log(menuItems[i].classList);
			menuItems[i].classList.remove('responsive');
		} else {
			menuItems[i].classList.add('responsive');
		}
	}

	

})

// function myFunction() {
//     var x = document.getElementById("myTopnav");
//     if (x.className === "topnav") {
//         x.className += " responsive";
//     } else {
//         x.className = "topnav";
//     }
// }