// Home Banner Swiper Interactivity

document.addEventListener('DOMContentLoaded', function () {


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

    // Play video from thumbnail click (About Section)
    const aboutThumbnail = document.getElementById('aboutThumbnail');
    const aboutPlayBtn = document.getElementById('aboutPlayBtn');
    const aboutVideo = document.querySelector('.about-video');
    function playAboutVideo() {
        if (aboutThumbnail) aboutThumbnail.style.display = 'none';
        if (aboutPlayBtn) aboutPlayBtn.style.display = 'none';
        if (aboutVideo) aboutVideo.play();
    }
    if (aboutThumbnail) aboutThumbnail.addEventListener('click', playAboutVideo);
    if (aboutPlayBtn) aboutPlayBtn.addEventListener('click', playAboutVideo);
});

// Keunggulan Ethos interaktif
// Versi: deskripsi di HTML, muncul tepat di bawah list yang diklik

document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.keunggulan-item');
    const descs = document.querySelectorAll('.keunggulan-desc-item');
    const inner = document.querySelector('.keunggulan-inner');

    // Fungsi untuk set aktif berdasarkan index
    function setActive(idx) {
        items.forEach((item, i) => item.classList.toggle('active', i === idx));
        descs.forEach((desc, i) => desc.style.display = i === idx ? 'block' : 'none');
        const img = items[idx].querySelector('.keunggulan-bg-img');
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
});


// Ekosistem interaktif
// ... existing code ...

// Ekosistem Ethos Slider Manual (tanpa Swiper.js)
document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.ekosistem-swiper');
    const prevBtn = document.querySelector('.ekosistem-btn-prev');
    const nextBtn = document.querySelector('.ekosistem-btn-next');
    let currentCenter = 0;
    let autoSlideInterval;

    function getCards() {
        return Array.from(container.querySelectorAll('.ekosistem-card'));
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
    }

    function nextSlide() {
        const cards = getCards();
        currentCenter = (currentCenter + 1) % cards.length;
        updateSlider();
        resetAutoSlide();
    }

    function prevSlide() {
        const cards = getCards();
        currentCenter = (currentCenter - 1 + cards.length) % cards.length;
        updateSlider();
        resetAutoSlide();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 3000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
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

// Partnership Vertikal Carousel (HTML hardcode, update .active & background)
document.addEventListener('DOMContentLoaded', function () {
    const section = document.querySelector('.partnership-section');
    const slides = Array.from(document.querySelectorAll('.partnership-slide'));
    const upBtns = document.querySelectorAll('.partnership-btn-up');
    const downBtns = document.querySelectorAll('.partnership-btn-down');
    let current = 0; // default aktif index 0

    function showSlide(idx) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
        });
        // Ambil src dari .partnership-bg-img di slide aktif
        const bgImg = slides[idx].querySelector('.partnership-bg-img');
        if (bgImg && bgImg.src) {
            section.style.backgroundImage = `url('${bgImg.src}')`;
        } else {
            section.style.backgroundImage = '';
        }
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        showSlide(current);
    }

    function prevSlide() {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
    }

    if (slides.length > 0) {
        downBtns.forEach(btn => btn.addEventListener('click', nextSlide));
        upBtns.forEach(btn => btn.addEventListener('click', prevSlide));
        showSlide(current);
    }
});
