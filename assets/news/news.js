// Fungsi dinamis label tombol gallery
function updateGalleryDetailLabels() {
  const cards = document.querySelectorAll(".gallery-card");
  cards.forEach((card, idx) => {
    const container = card.querySelector(".gallery-card-container");
    const detailRow = card.querySelector(".gallery-detail-row span");
    if (!container || !detailRow) return;
    if (container.querySelector("img.gallery-card-img")) {
      detailRow.textContent = "Lihat Gambar";
    } else if (container.querySelector("video.gallery-card-img")) {
      detailRow.textContent = "Lihat Video";
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  updateGalleryDetailLabels();
  setupFancyBoxGallery();
});

// Setup FancyBox Gallery
function setupFancyBoxGallery() {
  Fancybox.bind("[data-fancybox]", {
    theme: "light",
    mainStyle: {
      "--f-toolbar-padding": "0",
      "--f-button-svg-stroke-width": "1.5",
      "--f-arrow-svg-stroke-width": "1.75",
      "--f-thumb-width": "82px",
      "--f-thumb-height": "82px",
      "--f-thumb-border-radius": "8px",
      "--f-thumb-selected-shadow": "inset 0 0 0 2px #fff, 0 0 0 1.5px #ff2e00",
    },
    zoomEffect: false,
    fadeEffect: false,
    showClass: "f-fadeIn",
    hideClass: false,
    dragToClose: false,
    Carousel: {
      Toolbar: {
        absolute: false,
        display: {
          middle: ["counter"], // Tidak ada toggleSlideshow di sini
          right: ["toggleFull", "close"], // Tetap tanpa toggleSlideshow
        },
      },
      Thumbs: {
        type: "classic",
      },
    },
    // Pastikan plugin Slideshow juga tidak aktif
    Slideshow: false,
  });
}

// Events Slider Functionality (sama persis dengan ekosistem di home)
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".events-swiper");
  const prevBtn = document.querySelector(".events-btn-prev");
  const nextBtn = document.querySelector(".events-btn-next");
  let currentCenter = 0;
  let autoSlideInterval;
  let isPaused = false;

  function getCards() {
    return Array.from(container.querySelectorAll(".event-card"));
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
      card.classList.remove(
        "active",
        "left",
        "right",
        "left2",
        "right2",
        "out"
      );
      // Hitung offset relatif ke currentCenter (looping)
      let offset = idx - currentCenter;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;
      card.setAttribute("data-offset", offset);
      if (offset === 0) {
        card.classList.add("active");
      } else if (offset === -1) {
        card.classList.add("left");
      } else if (offset === -2) {
        card.classList.add("left2");
      } else if (offset === 1) {
        card.classList.add("right");
      } else if (offset === 2) {
        card.classList.add("right2");
      } else {
        card.classList.add("out");
      }
    });
    prevBtn.style.display = "flex";
    nextBtn.style.display = "flex";

    // Pause/resume auto-slide on hover active card
    cards.forEach((card, idx) => {
      card.removeEventListener("mouseenter", pauseAutoSlide);
      card.removeEventListener("mouseleave", resumeAutoSlide);
      if (card.classList.contains("active")) {
        card.addEventListener("mouseenter", pauseAutoSlide);
        card.addEventListener("mouseleave", resumeAutoSlide);
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
    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);
    const cards = getCards();
    currentCenter = Math.floor(cards.length / 2);
    updateSlider();
    startAutoSlide();
  }
});
