let botonMenu = document.querySelector('.icon'); 


botonMenu.addEventListener('click', (e) => {
	let menuItems = document.querySelectorAll('#menu-item');

	console.log(menuItems);


	for (let i=0; i < menuItems.length; i++) {
		// console.log(i);
		if (menuItems[i].classList.contains('responsive')) {
			// console.log(menuItems[i].classList);
			menuItems[i].classList.remove('responsive');
			if (typeof(menuItems[i+1])!='undefined') {
				menuItems[i+1].removeAttribute('style');
			}
		} else {
			menuItems[i].classList.add('responsive');
			if (typeof(menuItems[i+1])!='undefined') {
				menuItems[i+1].style.display = 'block';
			}

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