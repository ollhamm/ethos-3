// Home Banner Swiper Interactivity

document.addEventListener('DOMContentLoaded', function () {
    const progressBars = document.querySelectorAll('.home-banner-progress-bar');

    function updateProgress(activeIdx) {
        progressBars.forEach((bar, idx) => {
            bar.classList.toggle('home-banner-progress-bar-active', idx === activeIdx);
        });
    }

    // Swiper initialization
    const swiper = new Swiper('.home-banner-swiper', {
        loop: true,
        effect: 'slide',
        allowTouchMove: true,
        speed: 600,
        navigation: {
            nextEl: '.home-banner-btn-next',
            prevEl: '.home-banner-btn-prev',
        },
        on: {
            slideChange: function () {
                updateProgress(this.realIndex);
            },
        },
    });

    // Set initial progress
    updateProgress(swiper.realIndex);

    const slides = document.querySelectorAll('.home-banner-slide');
    const prevBtn = document.querySelector('.home-banner-btn-prev');
    const nextBtn = document.querySelector('.home-banner-btn-next');
    let current = 0;

    function showSlide(idx) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
        });
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        showSlide(current);
    }

    function prevSlide() {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
    }

    if (nextBtn && prevBtn && slides.length > 0) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        showSlide(current);
    }
});
