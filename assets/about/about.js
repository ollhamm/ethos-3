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

// History Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.sejarah-slide');
  const timelineNumbers = document.querySelectorAll('.timeline-number');
  const prevBtn = document.querySelector('.sejarah-nav-prev');
  const nextBtn = document.querySelector('.sejarah-nav-next');
  const scrollThumb = document.querySelector('.sejarah-scroll-thumb');
  const currentSlideSpan = document.querySelector('.sejarah-current-slide');
  const totalSlidesSpan = document.querySelector('.sejarah-total-slides');
  
  let current = 0;
  const totalSlides = slides.length;

  // Update scroll bar position
  function updateScrollBar(index) {
    const trackHeight = 120; // Height of scroll track
    const thumbHeight = 40; // Height of scroll thumb
    const maxTop = trackHeight - thumbHeight;
    const topPosition = (index / (totalSlides - 1)) * maxTop;
    
    scrollThumb.style.top = `${topPosition}px`;
    currentSlideSpan.textContent = index + 1;
  }

  // Update total slides info
  function updateTotalInfo() {
    totalSlidesSpan.textContent = `/${totalSlides}`;
  }

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
    
    // Update active timeline number
    timelineNumbers.forEach((num, i) => {
      num.classList.toggle('active', i === idx);
    });

    // Update scroll bar
    updateScrollBar(idx);
  }

  function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  }

  // Timeline number click events
  timelineNumbers.forEach((number, index) => {
    number.addEventListener('click', () => {
      current = index;
      showSlide(current);
    });
  });

  // Navigation button events
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      prevSlide();
    } else if (e.key === 'ArrowDown') {
      nextSlide();
    }
  });

  // Initialize
  if (slides.length > 0) {
    updateTotalInfo();
    showSlide(current);
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
});

// Nawasila Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
  const nawasilaItems = document.querySelectorAll('.nawasila-item');
  const modal = document.getElementById('nawasilaModal');
  const modalClose = document.getElementById('nawasilaModalClose');
  const modalTitle = document.getElementById('nawasilaModalTitle');
  const modalDescription = document.getElementById('nawasilaModalDescription');

  // Function untuk membuka modal
  function openModal(item) {
    const title = item.querySelector('.nawasila-item-title').textContent;
    const description = item.querySelector('.nawasila-description p').textContent;
    
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Function untuk menutup modal
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  // Event listeners untuk item nawasila
  nawasilaItems.forEach(item => {
    item.addEventListener('click', function() {
      openModal(this);
    });
  });

  // Event listener untuk tombol close
  modalClose.addEventListener('click', closeModal);

  // Event listener untuk menutup modal ketika klik di luar modal
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Event listener untuk menutup modal dengan keyboard (ESC)
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
});

// Cisi Misi Section Carousel Scroll Logic
(function () {
    const cisiMisiList = document.querySelector('.cisi-misi-list');
    const prevBtn = document.querySelector('.cisi-misi-slider-btn-prev');
    const nextBtn = document.querySelector('.cisi-misi-slider-btn-next');
    const dotsContainer = document.querySelector('.cisi-misi-slider-dots');
    const cardWidth = 320 + 32; // card width + gap
    const cardsPerPage = 2; // Changed from 3 to 2 cards per slide
    
    if (!cisiMisiList) return;
    
    const totalCards = cisiMisiList.querySelectorAll('.cisi-misi-card-container').length;
    const totalPages = Math.ceil(totalCards / cardsPerPage);

    // Generate dots automatically
    function generateDots() {
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = ''; // Clear existing dots
        
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('span');
            dot.className = 'cisi-misi-slider-dot';
            if (i === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        }
    }

    // Generate dots on page load
    generateDots();

    // Get dots after generation
    const dots = Array.from(document.querySelectorAll('.cisi-misi-slider-dot'));

    function updateActiveDotAndButtons() {
        // Dot logic - Fixed calculation
        if (dots.length) {
            const scrollLeft = cisiMisiList.scrollLeft;
            const scrollPosition = scrollLeft / (cardWidth * cardsPerPage);
            const currentPage = Math.round(scrollPosition);
            
            // Ensure currentPage is within valid range
            const validPage = Math.max(0, Math.min(currentPage, totalPages - 1));
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === validPage);
            });
        }
        
        // Button disable logic
        if (prevBtn) prevBtn.disabled = cisiMisiList.scrollLeft <= 0;
        if (nextBtn) {
            const maxScroll = cisiMisiList.scrollWidth - cisiMisiList.clientWidth - 2; // -2 for rounding
            nextBtn.disabled = cisiMisiList.scrollLeft >= maxScroll;
        }
    }

    cisiMisiList.addEventListener('scroll', updateActiveDotAndButtons);

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            cisiMisiList.scrollBy({ left: -cardWidth * cardsPerPage, behavior: 'smooth' });
            setTimeout(updateActiveDotAndButtons, 400);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            cisiMisiList.scrollBy({ left: cardWidth * cardsPerPage, behavior: 'smooth' });
            setTimeout(updateActiveDotAndButtons, 400);
        });
    }
    
    dots.forEach((dot, i) => {
        dot.addEventListener('click', function () {
            cisiMisiList.scrollTo({
                left: i * cardWidth * cardsPerPage,
                behavior: 'smooth'
            });
            setTimeout(updateActiveDotAndButtons, 400);
        });
    });

    updateActiveDotAndButtons();
})();

// Company Holding Swiper
document.addEventListener('DOMContentLoaded', function() {
  new Swiper('.company-holding-swiper', {
    slidesPerView: 2,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    breakpoints: {
      640: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 5,
      },
    },
  });
});

// Our Team Slider
document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.our-team-swiper');
    const prevBtn = document.querySelector('.our-team-btn-prev');
    const nextBtn = document.querySelector('.our-team-btn-next');
    let currentCenter = 0;
    let autoSlideInterval;
    let isPaused = false;

    function getCards() {
        return Array.from(container.querySelectorAll('.our-team-card'));
    }

    function updateSlider() {
        const cards = getCards();
        if (cards.length === 0) return;
        if (currentCenter < 0 || currentCenter >= cards.length) {
            currentCenter = Math.floor(cards.length / 2);
        }
        const total = cards.length;
        const maxShow = 2; // 2 kiri, 2 kanan
        cards.forEach((card, idx) => {
            card.classList.remove('active', 'left', 'right', 'left2', 'right2', 'out');
            // Hitung offset relatif ke currentCenter (looping)
            let offset = idx - currentCenter;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;
            card.setAttribute('data-offset', offset);
            if (offset === 0) {
                card.classList.add('active');
            } else if (offset === -1) {
                card.classList.add('left');
            } else if (offset === -2) {
                card.classList.add('left2');
            } else if (offset === 1) {
                card.classList.add('right');
            } else if (offset === 2) {
                card.classList.add('right2');
            } else {
                card.classList.add('out');
            }
        });
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';

        // Pause/resume auto-slide on hover active card
        cards.forEach((card, idx) => {
            card.removeEventListener('mouseenter', pauseAutoSlide);
            card.removeEventListener('mouseleave', resumeAutoSlide);
            if (card.classList.contains('active')) {
                card.addEventListener('mouseenter', pauseAutoSlide);
                card.addEventListener('mouseleave', resumeAutoSlide);
            }
        });
    }

    function nextSlide() {
        const cards = getCards();
        currentCenter = (currentCenter + 1) % cards.length;
        updateSlider();
        if (!isPaused) resetAutoSlide();
    }

    function prevSlide() {
        const cards = getCards();
        currentCenter = (currentCenter - 1 + cards.length) % cards.length;
        updateSlider();
        if (!isPaused) resetAutoSlide();
    }

    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            if (!isPaused) nextSlide();
        }, 3000);
    }

    function resetAutoSlide() {
        if (!isPaused) {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }
    }

    function pauseAutoSlide() {
        isPaused = true;
        clearInterval(autoSlideInterval);
    }
    
    function resumeAutoSlide() {
        isPaused = false;
        startAutoSlide();
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        const cards = getCards();
        currentCenter = Math.floor(cards.length / 2);
        updateSlider();
        startAutoSlide();
    }
});





