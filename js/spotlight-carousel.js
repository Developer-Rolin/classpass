document.addEventListener('DOMContentLoaded', function () {

    const spotlightTrack = document.querySelector('.spotlight-track');
    const carouselButtons = document.querySelectorAll('.carousel-nav-btn');
    const paginationButtons = document.querySelectorAll('.carousel-pagination button');

    if (!spotlightTrack) return;

    const cards = spotlightTrack.querySelectorAll('.press-card');
    let currentIndex = 0;

    // ==========================
    // BOTÕES DESKTOP
    // ==========================
    carouselButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('disabled')) return;

            const side = btn.id === 'spotlightPrevBtn' ? 'left' : 'right';
            fullNav(side, btn);
            currentIndex = side === 'right' ? 1 : 0;
        });
    });

    // ==========================
    // PAGINAÇÃO
    // ==========================
    paginationButtons.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (dot.classList.contains('current')) return;

            if (window.innerWidth < 540) {
                goToIndex(index);
            } else {
                const side = index === 0 ? 'left' : 'right';
                const btn = document.querySelector('.carousel-nav-btn:not(.disabled)');
                fullNav(side, btn);
                currentIndex = index;
            }
        });
    });

    function goToIndex(index) {
        const targetCard = cards[index];
        const distance = -targetCard.offsetLeft;

        spotlightTrack.style.transition = 'transform 0.3s ease';
        spotlightTrack.style.transform = `translateX(${distance}px)`;

        paginationButtons.forEach(btn => btn.classList.remove('current'));
        paginationButtons[index].classList.add('current');

        currentIndex = index;
    }

    function fullNav(side, btn) {
        const scrollWidth = spotlightTrack.clientWidth;
        const containerWidth = spotlightTrack.parentElement.scrollWidth;

        document.querySelector('.carousel-nav-btn.disabled')?.classList.remove('disabled');
        btn.classList.add('disabled');

        const distance = side === 'right'
            ? -(containerWidth - scrollWidth - 20)
            : 0;

        spotlightTrack.style.transition = 'transform 0.3s ease';
        spotlightTrack.style.transform = `translateX(${distance}px)`;

        paginationButtons[side === 'right' ? 1 : 0].classList.add('current');
        paginationButtons[side === 'right' ? 0 : 1].classList.remove('current');
    }

    // ==========================
    // SWIPE MOBILE FLUIDO (OFFSET REAL)
    // ==========================
    let startX = 0;
    let isSwiping = false;
    let currentOffset = 0;

    spotlightTrack.addEventListener('touchstart', (e) => {
        if (window.innerWidth >= 540) return;

        startX = e.touches[0].clientX;
        isSwiping = true;
        currentOffset = -cards[currentIndex].offsetLeft;
        spotlightTrack.style.transition = 'none';
    }, { passive: true });

    spotlightTrack.addEventListener('touchmove', (e) => {
        if (!isSwiping || window.innerWidth >= 540) return;

        const moveX = e.touches[0].clientX - startX;
        spotlightTrack.style.transform = `translateX(${currentOffset + moveX}px)`;
    }, { passive: true });

    spotlightTrack.addEventListener('touchend', (e) => {
        if (!isSwiping || window.innerWidth >= 540) return;

        isSwiping = false;
        const endX = e.changedTouches[0].clientX;
        const diff = endX - startX;

        if (diff < -50 && currentIndex < cards.length - 1) currentIndex++;
        if (diff > 50 && currentIndex > 0) currentIndex--;

        goToIndex(currentIndex);
    });

    // ==========================
    // RESET RESIZE
    // ==========================
    const getSize = () => (window.innerWidth < 540 ? 'small' : 'big');
    let currentSize = getSize();

    window.addEventListener('resize', () => {
        if (currentSize !== getSize()) {
            spotlightTrack.style.transition = 'none';
            spotlightTrack.style.transform = `translateX(0px)`;

            carouselButtons[0].classList.add('disabled');
            carouselButtons[1].classList.remove('disabled');

            paginationButtons.forEach(el => el.classList.remove('current'));
            paginationButtons[0].classList.add('current');

            currentIndex = 0;
            currentSize = getSize();
        }
    });

});
