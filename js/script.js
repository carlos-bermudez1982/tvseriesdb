let slideIndex = 1;
next = document.querySelector('.next');
prev = document.querySelector('.prev');

next.addEventListener('click', () => {
  moveSlide(1);
})

prev.addEventListener('click', () => {
  moveSlide(-1);
})


function moveSlide(n) {
  showSlides(slideIndex += n);
}

showSlides(slideIndex);

function showSlides() {
  let i;
  let slides = document.querySelectorAll('.imagenes');
  
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

