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
        currentIndex = index; // Update current index
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        let nextIndex = (currentIndex + 1) % slides.length;
        updateSlides(nextIndex);
    }

    function prevSlide() {
        let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlides(prevIndex);
    }

    // Touch Event Handlers
    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
    }

    function handleTouchMove(e) {
        touchEndX = e.touches[0].clientX;
    }

    function handleTouchEnd() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        // Reset touch coordinates
        touchStartX = 0;
        touchEndX = 0;
    }

    // Event Listeners
    slidesContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    slidesContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
    slidesContainer.addEventListener('touchend', handleTouchEnd);

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => updateSlides(index));
    });

    // Cleanup function to remove event listeners
    return function cleanup() {
        slidesContainer.removeEventListener('touchstart', handleTouchStart);
        slidesContainer.removeEventListener('touchmove', handleTouchMove);
        slidesContainer.removeEventListener('touchend', handleTouchEnd);
    };
}

// Initialize all slideshows when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const slideshows = document.querySelectorAll('.slideshow');
    slideshows.forEach(slideshow => initSlideshow(slideshow));
});