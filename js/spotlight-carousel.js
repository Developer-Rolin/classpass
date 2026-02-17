document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".spotlight-track");
  const cards = Array.from(document.querySelectorAll(".press-card"));
  const paginationContainer = document.querySelector(".carousel-pagination");
  const nextBtn = document.getElementById("spotlightNextBtn");
  const prevBtn = document.getElementById("spotlightPrevBtn");

  let currentIndex = 0;
  let cardsPerView = 1;

  function updateConfig() {
    const windowWidth = window.innerWidth;
    const trackVisibleWidth = track.offsetWidth;
    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(window.getComputedStyle(track).gap) || 32;

    cardsPerView = Math.floor((trackVisibleWidth + gap) / (cardWidth + gap));

    const isSmallScreen = windowWidth <= 820;

    setupPagination(isSmallScreen);
    goToSlide(0);
  }

  function setupPagination(isSmallScreen) {
    paginationContainer.innerHTML = "";
    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(window.getComputedStyle(track).gap) || 32;
    const trackWidth = track.offsetWidth;

    let numPositions;

    if (isSmallScreen) {
      numPositions = cards.length;
    } else {
      const totalContentWidth = cards.length * cardWidth + (cards.length - 1) * gap;
      numPositions = cards.length - cardsPerView + 1;
    }

    for (let i = 0; i < numPositions; i++) {
      const dot = document.createElement("button");
      if (i === 0) dot.classList.add("current");
      dot.addEventListener("click", () => goToSlide(i));
      paginationContainer.appendChild(dot);
    }
  }

  function goToSlide(index) {
    const dots = paginationContainer.querySelectorAll("button");
    if (index < 0) index = 0;
    if (index >= dots.length) index = dots.length - 1;

    currentIndex = index;

    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(window.getComputedStyle(track).gap) || 32;
    const windowWidth = window.innerWidth;

    let moveAmount;

    if (windowWidth <= 820) {
      const centerOffset = (windowWidth - cardWidth) / 2;

      const calculatedMove = index * (cardWidth + gap) - centerOffset;

      moveAmount = Math.max(-20, calculatedMove);
    } else {
      moveAmount = index * (cardWidth + gap);
    }

    track.style.transform = `translateX(${-moveAmount}px)`;
    updateUI(dots.length);
  }

  function updateUI(totalDots) {
    const dots = paginationContainer.querySelectorAll("button");
    dots.forEach((dot, i) => dot.classList.toggle("current", i === currentIndex));

    if (prevBtn && nextBtn) {
      prevBtn.classList.toggle("disabled", currentIndex === 0);
      nextBtn.classList.toggle("disabled", currentIndex === totalDots - 1);
    }
  }

  let touchStartX = 0;
  let touchStartY = 0;
  let isMoving = false;

  track.addEventListener(
    "touchstart",
    e => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
      isMoving = true;
    },
    { passive: true }
  );

  track.addEventListener(
    "touchend",
    e => {
      if (!isMoving) return;

      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;

      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (e.cancelable) e.preventDefault();

        if (diffX > 0) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(currentIndex - 1);
        }
      }

      touchStartX = 0;
      touchStartY = 0;
      isMoving = false;
    },
    { passive: false }
  );

  nextBtn?.addEventListener("click", () => goToSlide(currentIndex + 1));
  prevBtn?.addEventListener("click", () => goToSlide(currentIndex - 1));

  window.addEventListener("resize", () => {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(updateConfig, 100);
  });

  updateConfig();
});
