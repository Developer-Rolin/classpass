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
            if (i === currentIndex) btn.classList.add('current');
            btn.addEventListener('click', () => goToSlide(i));
            pagination.appendChild(btn);
        }
    }

    function goToSlide(index) {
        const numPages = cards.length - cardsPerView + 1;
        if (index < 0) index = 0;
        if (index >= numPages) index = numPages - 1;

        currentIndex = index;

        // No iOS, é melhor recalcular a largura para garantir precisão
        const cardWidth = cards[0].offsetWidth; 
        const style = window.getComputedStyle(track);
        const gap = parseInt(style.columnGap || style.gap) || 32;
        
        const moveAmount = (cardWidth + gap) * currentIndex;

        // translate3d força o uso da GPU no iPhone, deixando muito mais fluido
        track.style.transform = `translate3d(-${moveAmount}px, 0, 0)`;
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

    // --- LÓGICA DE SWIPE ROBUSTA PARA IOS ---
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const currentX = e.touches[0].clientX;
        const diffX = startX - currentX;

        // Se o movimento horizontal for maior que o vertical, bloqueamos o scroll da página
        if (Math.abs(diffX) > 10) {
            // No iOS, se você quiser impedir o 'bounce' lateral, 
            // precisaria de e.preventDefault(), mas isso requer {passive: false}
        }
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        const threshold = 50; // pixels necessários para mover

        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                goToSlide(currentIndex + 1);
            } else {
                goToSlide(currentIndex - 1);
            }
        }
        isDragging = false;
    });

    nextBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));
    prevBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));

    window.addEventListener('resize', () => {
        setupPagination();
        goToSlide(currentIndex); // Mantém o slide atual ao redimensionar
    });

    setupPagination();
    goToSlide(0);
});