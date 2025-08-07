// Brand Hero Banner Slider
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".brand-hero-slide");
  const prevBtn = document.querySelector(".previous-banner-brand");
  const nextBtn = document.querySelector(".next-banner-brand");
  let current = 0;
  let isTransitioning = false;
  let autoSlideTimer = null;
  const autoSlideInterval = 3000;

  function showSlide(idx) {
    if (isTransitioning || idx === current) return;

    isTransitioning = true;

    slides[current].classList.remove("active");

    current = idx;

    slides[current].classList.add("active");

    setTimeout(() => {
      isTransitioning = false;
    }, 8000);
  }

  function nextSlide() {
    const nextIndex = (current + 1) % slides.length;
    showSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = (current - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  function startAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
    }

    autoSlideTimer = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, autoSlideInterval);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  function handleManualInteraction() {
    stopAutoSlide();

    setTimeout(() => {
      startAutoSlide();
    }, 8000);
  }

  // Initialize slider
  if (nextBtn && prevBtn && slides.length > 0) {
    // Show initial slide
    slides[current].classList.add("active");

    // Add event listeners
    nextBtn.addEventListener("click", () => {
      nextSlide();
      handleManualInteraction();
    });
    prevBtn.addEventListener("click", () => {
      prevSlide();
      handleManualInteraction();
    });

    // Start auto slide
    startAutoSlide();

    // Pause auto slide on hover (optional)
    const sliderContainer = document.querySelector(".brand-hero-banner");
    if (sliderContainer) {
      sliderContainer.addEventListener("mouseenter", stopAutoSlide);
      sliderContainer.addEventListener("mouseleave", startAutoSlide);
    }
  }
});

// Variant Carousel Slider
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".variant-swiper");
  const prevBtn = document.querySelector(".variant-btn-prev");
  const nextBtn = document.querySelector(".variant-btn-next");
  let currentCenter = 0;
  let autoSlideInterval;
  let isPaused = false;

  function getCards() {
    return Array.from(container.querySelectorAll(".variant-card"));
  }

  function updateSlider() {
    const cards = getCards();
    if (cards.length === 0) return;

    // Jika hanya ada 1 card, tidak perlu slider logic
    if (cards.length === 1) {
      cards[0].classList.remove(
        "active",
        "left",
        "right",
        "left2",
        "right2",
        "out"
      );
      cards[0].classList.add("active");
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
      return;
    }

    if (currentCenter < 0 || currentCenter >= cards.length) {
      currentCenter = Math.floor(cards.length / 2);
    }
    const total = cards.length;
    const maxShow = 2;
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
    const cards = getCards();

    // Jika hanya ada 1 card, sembunyikan tombol navigasi dan tidak jalankan slider
    if (cards.length <= 1) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
      // Set card pertama sebagai active tanpa slider functionality
      if (cards.length === 1) {
        cards[0].classList.add("active");
        container.classList.add("single-card");
      }
    } else {
      // Jalankan slider functionality jika ada lebih dari 1 card
      container.classList.remove("single-card");
      nextBtn.addEventListener("click", nextSlide);
      prevBtn.addEventListener("click", prevSlide);
      currentCenter = Math.floor(cards.length / 2);
      updateSlider();
      startAutoSlide();
    }
  }
});

// Smooth scroll to variants function
function scrollToVariants() {
  const variantSection = document.querySelector(".package-section");
  if (variantSection) {
    variantSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Panduan Konsumsi interaktif
document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".panduan-item");
  const descItems = document.querySelectorAll(".panduan-desc-item");
  const rightImg = document.querySelector(".panduan-right .panduan-bg-img");
  const rightDescDisplay = document.querySelector(
    ".panduan-desc-display .panduan-description"
  );

  // Fungsi untuk set aktif berdasarkan index
  function setActive(idx) {
    items.forEach((item, i) => item.classList.toggle("active", i === idx));

    // Update gambar di sebelah kanan
    const img = items[idx].querySelector(".panduan-bg-img");
    if (img && rightImg) {
      rightImg.src = img.src;
    }

    // Show/hide deskripsi yang sesuai di card kanan
    const descItems = document.querySelectorAll(
      ".panduan-right .panduan-desc-item"
    );
    descItems.forEach((desc, i) => {
      if (i === idx) {
        desc.style.display = "block";
        // Add active class after a small delay for animation
        setTimeout(() => {
          desc.classList.add("active");
        }, 50);
      } else {
        desc.classList.remove("active");
        desc.style.display = "none";
      }
    });

    // Add active class to right card for image animation
    const rightCard = document.querySelector(".panduan-right");
    if (rightCard) {
      rightCard.classList.add("active");
      setTimeout(() => {
        rightCard.classList.remove("active");
      }, 800);
    }
  }

  // Set default aktif ke index 0
  if (items.length > 0) {
    setActive(0);
  }

  items.forEach((item, idx) => {
    item.addEventListener("click", function () {
      setActive(idx);
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  new Swiper(".logo-brand-swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    speed: 3000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    allowTouchMove: false,
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

// Bahan Carousel Swiper
document.addEventListener("DOMContentLoaded", function () {
  const bahanSwiper = new Swiper(".bahan-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    speed: 800,
    navigation: {
      nextEl: ".bahan-swiper-button-next",
      prevEl: ".bahan-swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1440: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
    on: {
      init: function () {
        // Add smooth transition effect
        const slides = this.slides;
        slides.forEach((slide) => {
          slide.style.transition = "all 0.8s ease-in-out";
        });
      },
    },
  });
});
