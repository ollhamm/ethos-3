// function history
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".sejarah-slide");
  const timelineNumbers = document.querySelectorAll(".timeline-number");
  const timelineContainer = document.querySelector(
    ".sejarah-timeline-container"
  );
  const prevBtn = document.querySelector(".sejarah-nav-prev");
  const nextBtn = document.querySelector(".sejarah-nav-next");
  const scrollThumb = document.querySelector(".sejarah-scroll-thumb");
  const currentSlideSpan = document.querySelector(".sejarah-current-slide");
  const totalSlidesSpan = document.querySelector(".sejarah-total-slides");

  let current = 0;
  const totalSlides = slides.length;

  function updateScrollBar(index) {
    if (!scrollThumb) return;
    const trackHeight = 120;
    const thumbHeight = 40;
    const maxTop = trackHeight - thumbHeight;
    const topPosition = (index / (totalSlides - 1)) * maxTop;

    scrollThumb.style.top = `${topPosition}px`;
    if (currentSlideSpan) currentSlideSpan.textContent = index + 1;
  }

  function updateTimelineNumbers(currentIndex) {
    if (!timelineContainer) return;

    let startIndex = Math.max(0, currentIndex - 1);
    if (startIndex + 3 > totalSlides) {
      startIndex = Math.max(0, totalSlides - 3);
    }

    const numberHeight = 60 + 32;
    const translateY = -startIndex * numberHeight;

    timelineContainer.style.transform = `translateY(${translateY}px)`;

    timelineNumbers.forEach((num, i) => {
      num.classList.toggle("active", i === currentIndex);
    });
  }

  function updateTotalInfo() {
    if (totalSlidesSpan) totalSlidesSpan.textContent = `/${totalSlides}`;
  }

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === idx);
    });

    updateTimelineNumbers(idx);
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

  timelineNumbers.forEach((number, index) => {
    number.addEventListener("click", () => {
      current = index;
      showSlide(current);
    });
  });

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
    });
    nextBtn.addEventListener("click", () => {
      nextSlide();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      prevSlide();
    } else if (e.key === "ArrowDown") {
      nextSlide();
    }
  });

  if (slides.length > 0) {
    updateTotalInfo();
    showSlide(current);
  }
});

// Core Value Nawasila Section Animations
document.addEventListener("DOMContentLoaded", function () {
  const nawasilaItems = document.querySelectorAll(".nawasila-item");
  const nawasilaCardTitle = document.querySelector(".nawasila-card-title");
  const nawasilaCardDesc = document.querySelector(".nawasila-card-desc");

  function setNawasilaActive(idx) {
    nawasilaItems.forEach((item, i) =>
      item.classList.toggle("active", i === idx)
    );

    if (nawasilaCardTitle && nawasilaCardDesc) {
      const activeItem = nawasilaItems[idx];
      const title = activeItem.querySelector(".nawasila-title").textContent;
      const desc = activeItem.querySelector(".nawasila-desc-item").textContent;

      nawasilaCardTitle.classList.add("slide-out");
      nawasilaCardDesc.classList.add("slide-out");

      setTimeout(() => {
        nawasilaCardTitle.textContent = title;
        nawasilaCardDesc.textContent = desc;

        nawasilaCardTitle.classList.remove("slide-out");
        nawasilaCardDesc.classList.remove("slide-out");
        nawasilaCardTitle.classList.add("slide-in");
        nawasilaCardDesc.classList.add("slide-in");

        setTimeout(() => {
          nawasilaCardTitle.classList.remove("slide-in");
          nawasilaCardDesc.classList.remove("slide-in");
        }, 250);
      }, 250);
    }
  }

  if (nawasilaItems.length > 0) {
    setNawasilaActive(0);
  }

  nawasilaItems.forEach((item, idx) => {
    item.addEventListener("click", function () {
      setNawasilaActive(idx);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);
      }
    });
  });
});

// Nawasila Modal Functionality
document.addEventListener("DOMContentLoaded", function () {
  const nawasilaItems = document.querySelectorAll(".nawasila-item");
  const modal = document.getElementById("nawasilaModal");
  const modalClose = document.getElementById("nawasilaModalClose");
  const modalTitle = document.getElementById("nawasilaModalTitle");
  const modalDescription = document.getElementById("nawasilaModalDescription");

  // Function untuk membuka modal
  function openModal(item) {
    const title = item.querySelector(".nawasila-item-title").textContent;
    const description = item.querySelector(
      ".nawasila-description p"
    ).textContent;

    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  nawasilaItems.forEach((item) => {
    item.addEventListener("click", function () {
      openModal(this);
    });
  });

  modalClose.addEventListener("click", closeModal);

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
});

// Cisi Misi Section Carousel Scroll Logic
document.addEventListener("DOMContentLoaded", function () {
  const cisiMisiList = document.querySelector(".cisi-misi-list");
  const prevBtn = document.querySelector(".cisi-misi-slider-btn-prev");
  const nextBtn = document.querySelector(".cisi-misi-slider-btn-next");
  const dotsContainer = document.querySelector(".cisi-misi-slider-dots");
  const cardWidth = 320 + 32;
  const cardsPerPage = 2;

  if (!cisiMisiList) return;

  const totalCards = cisiMisiList.querySelectorAll(
    ".cisi-misi-card-container"
  ).length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  function generateDots() {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = "";

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("span");
      dot.className = "cisi-misi-slider-dot";
      if (i === 0) dot.classList.add("active");
      dotsContainer.appendChild(dot);
    }
  }

  generateDots();

  const dots = Array.from(document.querySelectorAll(".cisi-misi-slider-dot"));

  function updateActiveDotAndButtons() {
    if (dots.length) {
      const scrollLeft = cisiMisiList.scrollLeft;
      const scrollPosition = scrollLeft / (cardWidth * cardsPerPage);
      const currentPage = Math.round(scrollPosition);

      const validPage = Math.max(0, Math.min(currentPage, totalPages - 1));

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === validPage);
      });
    }

    if (prevBtn) prevBtn.disabled = cisiMisiList.scrollLeft <= 0;
    if (nextBtn) {
      const maxScroll = cisiMisiList.scrollWidth - cisiMisiList.clientWidth - 2;
      nextBtn.disabled = cisiMisiList.scrollLeft >= maxScroll;
    }
  }

  cisiMisiList.addEventListener("scroll", updateActiveDotAndButtons);

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      cisiMisiList.scrollBy({
        left: -cardWidth * cardsPerPage,
        behavior: "smooth",
      });
      setTimeout(updateActiveDotAndButtons, 400);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      cisiMisiList.scrollBy({
        left: cardWidth * cardsPerPage,
        behavior: "smooth",
      });
      setTimeout(updateActiveDotAndButtons, 400);
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", function () {
      cisiMisiList.scrollTo({
        left: i * cardWidth * cardsPerPage,
        behavior: "smooth",
      });
      setTimeout(updateActiveDotAndButtons, 400);
    });
  });

  updateActiveDotAndButtons();
});

// Our Team Slider
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".our-team-swiper");
  const prevBtn = document.querySelector(".our-team-btn-prev");
  const nextBtn = document.querySelector(".our-team-btn-next");
  let currentCenter = 0;
  let autoSlideInterval;
  let isPaused = false;

  function getCards() {
    return Array.from(container.querySelectorAll(".our-team-card"));
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

// Structure Company Modal Functionality
document.addEventListener("DOMContentLoaded", function () {
  const structureCards = document.querySelectorAll(".structure-card");
  const modal = document.getElementById("structureModal");
  const modalClose = document.getElementById("structureModalClose");
  const modalImage = document.getElementById("structureModalImage");
  const modalTitle = document.getElementById("structureModalTitle");
  const modalDescription = document.getElementById("structureModalDescription");

  // Check if modal elements exist
  if (
    !modal ||
    !modalClose ||
    !modalImage ||
    !modalTitle ||
    !modalDescription
  ) {
    console.warn("Structure modal elements not found");
    return;
  }

  // Function to open modal with company data
  function openStructureModal(cardElement) {
    try {
      // Get data from card attributes
      const companyData = {
        title: cardElement.getAttribute("data-title") || "Company Name",
        image: cardElement.getAttribute("data-image") || "",
        description:
          cardElement.getAttribute("data-description") ||
          "No description available.",
        company: cardElement.getAttribute("data-company") || "",
      };

      // Populate modal content
      modalTitle.textContent = companyData.title;
      modalDescription.textContent = companyData.description;
      modalImage.src = companyData.image;
      modalImage.alt = companyData.title;

      // Show modal with animation
      modal.classList.add("active");
      document.body.style.overflow = "hidden";

      // Add analytics or tracking if needed
      console.log(`Structure modal opened for: ${companyData.company}`);
    } catch (error) {
      console.error("Error opening structure modal:", error);
    }
  }

  // Function to close modal
  function closeStructureModal() {
    try {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";

      // Reset modal content after animation
      setTimeout(() => {
        modalTitle.textContent = "";
        modalDescription.textContent = "";
        modalImage.src = "";
        modalImage.alt = "";
      }, 300);
    } catch (error) {
      console.error("Error closing structure modal:", error);
    }
  }

  // Add click event listeners to structure cards
  structureCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      e.preventDefault();
      openStructureModal(this);
    });

    // Add keyboard accessibility
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openStructureModal(this);
      }
    });

    // Make cards focusable for accessibility
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute(
      "aria-label",
      `View details about ${
        card.querySelector(".structure-card-title h6").textContent
      }`
    );
  });

  // Close modal event listeners
  modalClose.addEventListener("click", closeStructureModal);

  // Close modal when clicking on overlay
  modal.addEventListener("click", function (e) {
    if (
      e.target === modal ||
      e.target.classList.contains("structure-modal-overlay")
    ) {
      closeStructureModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeStructureModal();
    }
  });

  // Prevent modal content clicks from closing modal
  const modalContent = modal.querySelector(".structure-modal-content");
  if (modalContent) {
    modalContent.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  // Handle image loading errors
  modalImage.addEventListener("error", function () {
    this.style.display = "none";
    console.warn("Structure modal image failed to load:", this.src);
  });

  modalImage.addEventListener("load", function () {
    this.style.display = "block";
  });
});
