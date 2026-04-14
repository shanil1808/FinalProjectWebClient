
const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');

let index = 0;
const total = images.length;

function showSlide(i) {
    index = (i + total) % total; // wrap around
    slides.style.transform = `translateX(${-index * 100}%)`;
}

// Auto-slide every 3 seconds
setInterval(() => {
    showSlide(index + 1);
}, 3000);