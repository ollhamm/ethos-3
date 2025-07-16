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

    const playBtn = document.querySelector('.about-play');
    const video = document.querySelector('.about-video');
    if (playBtn && video) {
        playBtn.addEventListener('click', function () {
            video.play();
            playBtn.style.display = 'none';
            video.setAttribute('controls', 'controls');
        });
        video.addEventListener('pause', function () {
            if (video.currentTime !== 0 && !video.ended) {
                playBtn.style.display = '';
                video.removeAttribute('controls');
            }
        });
    }
});

// Keunggulan Ethos interaktif
// Versi: deskripsi di HTML, muncul tepat di bawah list yang diklik

document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.keunggulan-item');
    const descs = document.querySelectorAll('.keunggulan-desc-item');

    // Sembunyikan semua deskripsi di awal
    descs.forEach(d => d.style.display = 'none');

    items.forEach((item, idx) => {
        item.addEventListener('click', function () {
            // Hilangkan highlight dari semua item
            items.forEach(i => i.classList.remove('active'));
            // Sembunyikan semua deskripsi
            descs.forEach(d => d.style.display = 'none');
            // Tampilkan deskripsi setelah item yang diklik
            descs[idx].style.display = 'block';
            // Highlight item aktif
            this.classList.add('active');
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
    }

    function prevSlide() {
        const cards = getCards();
        currentCenter = (currentCenter - 1 + cards.length) % cards.length;
        updateSlider();
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        const cards = getCards();
        currentCenter = Math.floor(cards.length / 2);
        updateSlider();
    }
});
