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
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
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

    // Auto slide setiap 5 detik
});