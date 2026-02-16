document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.spotlight-track');
    const cards = Array.from(document.querySelectorAll('.press-card'));
    const nextBtn = document.getElementById('spotlightNextBtn');
    const prevBtn = document.getElementById('spotlightPrevBtn');
    const pagination = document.querySelector('.carousel-pagination');

    let currentIndex = 0;
    let cardsPerView = window.innerWidth > 768 ? 2 : 1;

    // 1. Função para gerar Bullets dinamicamente
    function setupPagination() {
        pagination.innerHTML = '';
        cardsPerView = window.innerWidth > 768 ? 2 : 1;
        
        // Calculamos o número de "páginas"
        // Em desktop (2 cards), se temos 4 cards, o total de slides é 4 - 2 + 1 = 3
        const numPages = cards.length - cardsPerView + 1;

        for (let i = 0; i < numPages; i++) {
            const btn = document.createElement('button');
            if (i === 0) btn.classList.add('current');
            btn.addEventListener('click', () => goToSlide(i));
            pagination.appendChild(btn);
        }
    }

    // 2. Função de Navegação
    function goToSlide(index) {
        const numPages = cards.length - cardsPerView + 1;
        
        // Trava os limites
        if (index < 0) index = 0;
        if (index >= numPages) index = numPages - 1;

        currentIndex = index;

        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = 32; // Gap definido no CSS
        const moveAmount = (cardWidth + gap) * currentIndex;

        track.style.transform = `translateX(-${moveAmount}px)`;

        updateUI();
    }

    function updateUI() {
        // Atualiza Bullets
        const dots = document.querySelectorAll('.carousel-pagination button');
        dots.forEach((dot, i) => {
            dot.classList.toggle('current', i === currentIndex);
        });

        // Atualiza Setas (Disabled)
        const numPages = cards.length - cardsPerView + 1;
        prevBtn.classList.toggle('disabled', currentIndex === 0);
        nextBtn.classList.toggle('disabled', currentIndex === numPages - 1);
    }

    // 3. Eventos de Clique
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));

    // 4. Implementação de Swipe simples para Mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) goToSlide(currentIndex + 1); // Swipe Left
        if (touchEndX - touchStartX > 50) goToSlide(currentIndex - 1); // Swipe Right
    }

    // 5. Ajuste no Resize da janela
    window.addEventListener('resize', () => {
        setupPagination();
        goToSlide(0); // Reseta para evitar bugs de cálculo
    });

    // Inicialização
    setupPagination();
    updateUI();
});