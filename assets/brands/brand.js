// Brand Hero Banner Slider
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.brand-hero-slide');
    const prevBtn = document.querySelector('.previous-banner-brand');
    const nextBtn = document.querySelector('.next-banner-brand');
    let current = 0;
    let isTransitioning = false;

    function showSlide(idx) {
        if (isTransitioning || idx === current) return; // Prevent rapid clicking and same slide
        
        isTransitioning = true;
        
        // Remove active class from current slide
        slides[current].classList.remove('active');
        
        // Update current index
        current = idx;
        
        // Add active class to new slide immediately
        slides[current].classList.add('active');
        
        // Allow next transition after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, 600); // Match CSS transition duration
    }

    function nextSlide() {
        const nextIndex = (current + 1) % slides.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (current - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    // Initialize slider
    if (nextBtn && prevBtn && slides.length > 0) {
        // Show initial slide
        slides[current].classList.add('active');
        
        // Add event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
    }
});
