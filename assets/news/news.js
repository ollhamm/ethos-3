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
                // Tampilkan header di atas modal
                if (header) {
                    modal.querySelector('.gallery-modal-content').insertBefore(header.cloneNode(true), modalBody);
                }
                // Tampilkan scroll wrapper di bawah header
                if (scroll) {
                    modal.querySelector('.gallery-modal-content').insertBefore(scroll.cloneNode(true), null);
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
