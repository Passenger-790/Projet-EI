// Improved slider with controls
const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80"
];
let idx = 0;
const sliderImg = document.getElementById('slider-img');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const dots = document.querySelectorAll('.dot');
let intervalId;

function updateSlider() {
    sliderImg.src = images[idx];
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === idx);
    });
}

function nextSlide() {
    idx = (idx + 1) % images.length;
    updateSlider();
}

function prevSlide() {
    idx = (idx - 1 + images.length) % images.length;
    updateSlider();
}

function goToSlide(index) {
    idx = index;
    updateSlider();
}

function startAutoSlide() {
    intervalId = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
    clearInterval(intervalId);
}

// Event listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
});

// Pause on hover
const slider = document.querySelector('.slider');
slider.addEventListener('mouseenter', stopAutoSlide);
slider.addEventListener('mouseleave', startAutoSlide);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

// Start auto slide
startAutoSlide();