document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.spotlight-track');
    const cards = Array.from(document.querySelectorAll('.press-card'));
    const nextBtn = document.getElementById('spotlightNextBtn');
    const prevBtn = document.getElementById('spotlightPrevBtn');
    const pagination = document.querySelector('.carousel-pagination');

    let currentIndex = 0;
    let cardsPerView = window.innerWidth > 768 ? 2 : 1;

    function setupPagination() {
        pagination.innerHTML = '';
        cardsPerView = window.innerWidth > 768 ? 2 : 1;
        const numPages = cards.length - cardsPerView + 1;

        for (let i = 0; i < numPages; i++) {
            const btn = document.createElement('button');
            if (i === 0) btn.classList.add('current');
            btn.addEventListener('click', () => goToSlide(i));
            pagination.appendChild(btn);
        }
    }

    function goToSlide(index) {
        const numPages = cards.length - cardsPerView + 1;
        if (index < 0) index = 0;
        if (index >= numPages) index = numPages - 1;

        currentIndex = index;

        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = parseInt(window.getComputedStyle(track).gap) || 32;
        const moveAmount = (cardWidth + gap) * currentIndex;

        track.style.transform = `translateX(-${moveAmount}px)`;
        updateUI();
    }

    function updateUI() {
        const dots = document.querySelectorAll('.carousel-pagination button');
        dots.forEach((dot, i) => {
            dot.classList.toggle('current', i === currentIndex);
        });

        const numPages = cards.length - cardsPerView + 1;
        if(prevBtn) prevBtn.classList.toggle('disabled', currentIndex === 0);
        if(nextBtn) nextBtn.classList.toggle('disabled', currentIndex === numPages - 1);
    }

    // --- LÓGICA DE SWIPE CORRIGIDA PARA IOS ---
    let touchStartX = 0;
    let touchEndX = 0;

    // Adicionamos { passive: true } para melhorar a performance de scroll no iOS
    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        // Resetamos as variáveis para garantir que o próximo toque seja limpo
        touchStartX = 0;
        touchEndX = 0;
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50; // Sensibilidade do swipe
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                goToSlide(currentIndex + 1); // Swipe para a esquerda (próximo)
            } else {
                goToSlide(currentIndex - 1); // Swipe para a direita (anterior)
            }
        }
    }

    nextBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));
    prevBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));

    window.addEventListener('resize', () => {
        setupPagination();
        goToSlide(0);
    });

    setupPagination();
    updateUI();
});