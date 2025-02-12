class Slideshow {
    constructor(element) {
        // Core elements
        this.slideshow = element;
        this.slides = Array.from(this.slideshow.querySelectorAll('.slide'));
        this.dots = Array.from(this.slideshow.querySelectorAll('.nav-dot'));
        this.prevButton = this.slideshow.querySelector('.prev-arrow');
        this.nextButton = this.slideshow.querySelector('.next-arrow');
        
        // Set initial state
        this.currentIndex = 0;
        this.slides[0].classList.add('active');
        this.dots[0].classList.add('active');
        
        // Initialize
        this.initializeSlideshow();
    }

    initializeSlideshow() {
        // Add dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Add arrow navigation
        if (this.prevButton && this.nextButton) {
            this.prevButton.addEventListener('click', () => this.previousSlide());
            this.nextButton.addEventListener('click', () => this.nextSlide());
        }

        // Add keyboard navigation
        this.slideshow.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        // Add touch support
        let touchStartX = 0;
        let touchEndX = 0;

        this.slideshow.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        this.slideshow.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
        }, { passive: true });
    }

    goToSlide(index) {
        // Remove active classes
        this.slides[this.currentIndex].classList.remove('active');
        this.dots[this.currentIndex].classList.remove('active');
        
        // Update index
        this.currentIndex = index;
        
        // Add active classes
        this.slides[this.currentIndex].classList.add('active');
        this.dots[this.currentIndex].classList.add('active');
    }

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    previousSlide() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
}

// Initialize all slideshows when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const slideshows = document.querySelectorAll('.slideshow');
    slideshows.forEach(slideshow => new Slideshow(slideshow));
});