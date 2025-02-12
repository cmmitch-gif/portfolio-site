function initSlideshow(slideshowContainer) {
    const slides = slideshowContainer.querySelectorAll('.slide');
    const dots = slideshowContainer.querySelectorAll('.nav-dot');
    const prevButton = slideshowContainer.querySelector('.prev-arrow');
    const nextButton = slideshowContainer.querySelector('.next-arrow');
    const slidesContainer = slideshowContainer.querySelector('.slides');
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    // Initialize first dot as active
    dots[0].classList.add('active');

    function updateSlides(index) {
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlides(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlides(currentIndex);
    }

    // Touch Event Handlers
    slidesContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    slidesContainer.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    }, { passive: true });

    slidesContainer.addEventListener('touchend', () => {
        const swipeThreshold = 50; // minimum distance for swipe
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Swipe left
            } else {
                prevSlide(); // Swipe right
            }
        }
    });

    // Existing Event Listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlides(currentIndex);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const slideshows = document.querySelectorAll('.slideshow');
    slideshows.forEach(slideshow => initSlideshow(slideshow));
});