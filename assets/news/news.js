// Fungsi dinamis label tombol gallery
function updateGalleryDetailLabels() {
    const cards = document.querySelectorAll('.gallery-card');
    cards.forEach((card, idx) => {
        const container = card.querySelector('.gallery-card-container');
        const detailRow = card.querySelector('.gallery-detail-row span');
        if (!container || !detailRow) return;
        if (container.querySelector('img.gallery-card-img')) {
            detailRow.textContent = 'Lihat Gambar';
        } else if (container.querySelector('video.gallery-card-img')) {
            detailRow.textContent = 'Lihat Video';
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    updateGalleryDetailLabels();
    setupGalleryModal();
});

// Modal gallery
function setupGalleryModal() {
    // Modal HTML (jika belum ada)
    if (!document.getElementById('gallery-modal')) {
        const modal = document.createElement('div');
        modal.id = 'gallery-modal';
        modal.innerHTML = `
      <div class="gallery-modal-backdrop"></div>
      <div class="gallery-modal-content">
        <button class="gallery-modal-close" aria-label="Tutup">
        <i class="fas fa-times"></i>
        </button>
        <div class="gallery-modal-body"></div>
      </div>
    `;
        document.body.appendChild(modal);
    }
    const modal = document.getElementById('gallery-modal');
    const backdrop = modal.querySelector('.gallery-modal-backdrop');
    const closeBtn = modal.querySelector('.gallery-modal-close');
    const modalBody = modal.querySelector('.gallery-modal-body');

    // Event tombol lihat
    document.querySelectorAll('.gallery-btn-detail').forEach((btn, idx) => {
        btn.onclick = function (e) {
            e.preventDefault();
            const card = btn.closest('.gallery-card');
            const multiContent = card.querySelector('.gallery-multicontent');
            // Hapus header lama jika ada
            const oldHeader = modal.querySelector('.gallery-modal-header');
            if (oldHeader) oldHeader.remove();
            // Hapus scroll lama jika ada
            const oldScroll = modal.querySelector('.gallery-modal-scroll');
            if (oldScroll) oldScroll.remove();
            modalBody.innerHTML = '';
            if (multiContent) {
                // Ambil header dan scroll wrapper dari HTML
                const header = multiContent.querySelector('.gallery-modal-header');
                const scroll = multiContent.querySelector('.gallery-modal-scroll');
                const doodleAtas = multiContent.querySelector('.gallery-modal-doodle-atas-kanan');
                const doodleBawah = multiContent.querySelector('.gallery-modal-doodle-bawah-kiri');
                // Tampilkan header di atas modal
                if (header) {
                    modal.querySelector('.gallery-modal-content').insertBefore(header.cloneNode(true), modalBody);
                }
                // Tampilkan scroll wrapper di bawah header
                if (scroll) {
                    modal.querySelector('.gallery-modal-content').insertBefore(scroll.cloneNode(true), null);
                }
                // Tampilkan doodle jika ada
                if (doodleAtas) {
                    modal.querySelector('.gallery-modal-content').appendChild(doodleAtas.cloneNode(true));
                }
                if (doodleBawah) {
                    modal.querySelector('.gallery-modal-content').appendChild(doodleBawah.cloneNode(true));
                }
            } else {
                const img = card.querySelector('img.gallery-card-img');
                const vid = card.querySelector('video.gallery-card-img');
                if (img) {
                    const imgEl = document.createElement('img');
                    imgEl.src = img.src;
                    imgEl.alt = img.alt || '';
                    imgEl.className = 'gallery-modal-img';
                    modalBody.appendChild(imgEl);
                } else if (vid) {
                    const vidEl = document.createElement('video');
                    vidEl.src = vid.querySelector('source') ? vid.querySelector('source').src : vid.src;
                    vidEl.poster = vid.poster || '';
                    vidEl.controls = true;
                    vidEl.autoplay = true;
                    vidEl.className = 'gallery-modal-video';
                    modalBody.appendChild(vidEl);
                }
            }
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };
    });
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalBody.innerHTML = '';
    }
    closeBtn.onclick = closeModal;
    backdrop.onclick = closeModal;
    document.addEventListener('keydown', function (e) {
        if (modal.classList.contains('active') && e.key === 'Escape') closeModal();
    });
}

// Events Slider Functionality (sama persis dengan ekosistem di home)
document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.events-swiper');
    const prevBtn = document.querySelector('.events-btn-prev');
    const nextBtn = document.querySelector('.events-btn-next');
    let currentCenter = 0;
    let autoSlideInterval;
    let isPaused = false;

    function getCards() {
        return Array.from(container.querySelectorAll('.event-card'));
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
