document.addEventListener('DOMContentLoaded', function () {

    const spotlightTrack = document.querySelector('.spotlight-track');
    const carouselButtons = document.querySelectorAll('.carousel-nav-btn');
    const paginationButtons = document.querySelectorAll('.carousel-pagination button');

    if (!spotlightTrack) return;

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
        const cardSize = spotlightTrack.clientWidth;
        const distance = index === 0 ? 0 : -1 * cardSize * index + index * 20;

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
    // SWIPE SOMENTE MOBILE
    // ==========================
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    const getPositionX = (e) => e.touches[0].clientX;

    const getTranslateX = () => {
        const style = window.getComputedStyle(spotlightTrack);
        const matrix = new DOMMatrixReadOnly(style.transform);
        return matrix.m41;
    };

    const setTranslate = (value) => {
        spotlightTrack.style.transform = `translateX(${value}px)`;
    };

    spotlightTrack.addEventListener('touchstart', (e) => {
        if (window.innerWidth >= 540) return;

        isDragging = true;
        startX = getPositionX(e);
        prevTranslate = getTranslateX();
        spotlightTrack.style.transition = 'none';
    }, { passive: true });

    spotlightTrack.addEventListener('touchmove', (e) => {
        if (!isDragging || window.innerWidth >= 540) return;

        const currentPosition = getPositionX(e);
        currentTranslate = prevTranslate + currentPosition - startX;
        setTranslate(currentTranslate);
    }, { passive: true });

    spotlightTrack.addEventListener('touchend', () => {
        if (!isDragging) return;
        if (window.innerWidth >= 540) return;

        isDragging = false;

        const movedBy = currentTranslate - prevTranslate;

        spotlightTrack.style.transition = 'transform 0.3s ease';

        if (movedBy < -50 && currentIndex < paginationButtons.length - 1) {
            currentIndex++;
        }

        if (movedBy > 50 && currentIndex > 0) {
            currentIndex--;
        }

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
