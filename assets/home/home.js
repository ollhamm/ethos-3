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
