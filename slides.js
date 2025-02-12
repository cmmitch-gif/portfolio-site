function initSlideshow(slideshowContainer) {
    const slides = slideshowContainer.querySelectorAll('.slide');
    const dots = slideshowContainer.querySelectorAll('.nav-dot');
    const prevButton = slideshowContainer.querySelector('.prev-arrow');
    const nextButton = slideshowContainer.querySelector('.next-arrow');
    let currentIndex = 0;

    // Initialize first dot as active
    dots[0].classList.add('active');

    function updateSlides(index) {
        const slidesContainer = slideshowContainer.querySelector('.slides');
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;
        
        // Update dots
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

    // Event Listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Add dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlides(currentIndex);
        });
    });
}

// Initialize all slideshows when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const slideshows = document.querySelectorAll('.slideshow');
    slideshows.forEach(slideshow => initSlideshow(slideshow));
});