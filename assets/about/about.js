// keunggulan about
document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.sejarah-about-item');
    const descs = document.querySelectorAll('.sejarah-about-desc-item');
    const inner = document.querySelector('.sejarah-about-inner');

    // Fungsi untuk set aktif berdasarkan index
    function setActive(idx) {
        items.forEach((item, i) => item.classList.toggle('active', i === idx));
        descs.forEach((desc, i) => {
            desc.classList.toggle('active', i === idx);
        });
        const img = items[idx].querySelector('.sejarah-about-bg-img');
        if (img) inner.style.backgroundImage = `url('${img.src}')`;
    }

    // Set default aktif ke index 0
    if (items.length > 0) {
        setActive(0);
    }

    items.forEach((item, idx) => {
        item.addEventListener('click', function () {
            setActive(idx);
        });
    });

    // Awards Carousel
    const slides = document.querySelectorAll('.award-slide');
    const dots = document.querySelectorAll('.award-dot');
    const prevBtn = document.querySelector('.award-prev-btn');
    const nextBtn = document.querySelector('.award-next-btn');
    let currentSlide = 0;

    function showSlide(index) {
        // Hide all slides
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    // Event listeners untuk navigation
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Event listeners untuk dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Initialize first slide
    if (slides.length > 0) {
        showSlide(0);
    }

    // Company History Timeline
    const timelineYears = document.querySelectorAll('.timeline-year-dot');
    const historyDetails = document.querySelectorAll('.history-detail');
    const timelinePrev = document.getElementById('timelinePrev');
    const timelineNext = document.getElementById('timelineNext');
    let currentYearIndex = 0;

    function showHistoryDetail(index) {
        // Hide all history details and remove active class
        historyDetails.forEach((detail, i) => {
            detail.style.display = i === index ? 'grid' : 'none';
            detail.classList.remove('active');
        });

        // Add active class to current detail with delay for animation
        setTimeout(() => {
            if (historyDetails[index]) {
                historyDetails[index].classList.add('active');
            }
        }, 100);

        // Update timeline years
        timelineYears.forEach((year, i) => {
            year.classList.toggle('active', i === index);
        });

        // Update navigation buttons
        if (timelinePrev) timelinePrev.disabled = index === 0;
        if (timelineNext) timelineNext.disabled = index === timelineYears.length - 1;

        currentYearIndex = index;
    }

    function nextYear() {
        if (currentYearIndex < timelineYears.length - 1) {
            showHistoryDetail(currentYearIndex + 1);
        }
    }

    function prevYear() {
        if (currentYearIndex > 0) {
            showHistoryDetail(currentYearIndex - 1);
        }
    }

    // Event listeners untuk timeline
    timelineYears.forEach((year, index) => {
        year.addEventListener('click', () => showHistoryDetail(index));
    });

    if (timelinePrev) timelinePrev.addEventListener('click', prevYear);
    if (timelineNext) timelineNext.addEventListener('click', nextYear);

    // Initialize first year
    if (timelineYears.length > 0) {
        showHistoryDetail(0);
    }
});

// company history section
// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function () {
    // Any scroll-based animations can be added here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Add CSS classes for animations
document.addEventListener('DOMContentLoaded', function () {
    // Add animation classes to body
    document.body.classList.add('about-page');

    // Initialize tooltips for interactive elements
    const interactiveElements = document.querySelectorAll('[data-tooltip]');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function () {
            const tooltip = this.getAttribute('data-tooltip');
            if (tooltip) {
                showTooltip(this, tooltip);
            }
        });

        element.addEventListener('mouseleave', function () {
            hideTooltip();
        });
    });
});

// Core Value Nawasila Section Animations
document.addEventListener('DOMContentLoaded', function () {
    // Nawasila List Functionality
    const nawasilaItems = document.querySelectorAll('.nawasila-item');
    const nawasilaCardTitle = document.querySelector('.nawasila-card-title');
    const nawasilaCardDesc = document.querySelector('.nawasila-card-desc');

    // Fungsi untuk set aktif berdasarkan index
    function setNawasilaActive(idx) {
        nawasilaItems.forEach((item, i) => item.classList.toggle('active', i === idx));

        // Update card content with slide animation
        if (nawasilaCardTitle && nawasilaCardDesc) {
            const activeItem = nawasilaItems[idx];
            const title = activeItem.querySelector('.nawasila-title').textContent;
            const desc = activeItem.querySelector('.nawasila-desc-item').textContent;

            // Add slide-out animation
            nawasilaCardTitle.classList.add('slide-out');
            nawasilaCardDesc.classList.add('slide-out');

            // After slide-out animation, update content and slide-in
            setTimeout(() => {
                nawasilaCardTitle.textContent = title;
                nawasilaCardDesc.textContent = desc;

                // Remove slide-out and add slide-in
                nawasilaCardTitle.classList.remove('slide-out');
                nawasilaCardDesc.classList.remove('slide-out');
                nawasilaCardTitle.classList.add('slide-in');
                nawasilaCardDesc.classList.add('slide-in');

                // After slide-in animation, reset to normal state
                setTimeout(() => {
                    nawasilaCardTitle.classList.remove('slide-in');
                    nawasilaCardDesc.classList.remove('slide-in');
                }, 250);
            }, 250);
        }
    }

    // Set default aktif ke index 0
    if (nawasilaItems.length > 0) {
        setNawasilaActive(0);
    }

    nawasilaItems.forEach((item, idx) => {
        item.addEventListener('click', function () {
            setNawasilaActive(idx);
        });
    });


    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    });



    // Hover effects for Nawasila items
    nawasilaItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            }
        });

        item.addEventListener('mouseleave', function () {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Image hover effect
    const coreValueImage = document.querySelector('.core-value-image');
    if (coreValueImage) {
        coreValueImage.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
        });

        coreValueImage.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    }
});





