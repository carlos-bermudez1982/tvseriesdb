let slideIndex = 1;
let slides = document.querySelectorAll('.imagenes');

let next = document.querySelector('.next');
let prev = document.querySelector('.prev');

next.addEventListener('click', () => {
  moveSlide(1);
})

prev.addEventListener('click', () => {
  moveSlide(-1);
})


function moveSlide(n) {
  showSlides(slideIndex += n);
}



function showSlides() {
  let i;
  // let slides = document.querySelectorAll('.imagenes');
  
  if (slideIndex > slides.length) {
    slideIndex = 1;
  } 

  if (slideIndex < 1) {
    slideIndex = slides.length;
  }

  for (i=0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }

  slides[slideIndex-1].style.display = 'block';

}

function carrousel() {
  showSlides(slideIndex);
  slideIndex++;
  setTimeout(carrousel, 4000);
}

carrousel();

// prueba