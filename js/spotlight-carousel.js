document.addEventListener('DOMContentLoaded', function () {

const track = document.querySelector('.spotlight-track');
const cards = Array.from(track.children);
const nextBtn = document.getElementById('spotlightNextBtn');
const prevBtn = document.getElementById('spotlightPrevBtn');
const dots = document.querySelectorAll('.carousel-pagination button');

let currentIndex = 0;

// Determina quantos cards cabem na tela
function getVisibleCardsCount() {
    if (window.innerWidth <= 540) return 1;
    if (window.innerWidth <= 802) return 2;
    return 3;
}

// O pulo do gato: O índice máximo não é cards.length, 
// é o total de cards menos os que já estão aparecendo.
function getMaxIndex() {
    return cards.length - getVisibleCardsCount();
}

function moveCarousel(index) {
    // Validação de limites
    const maxIdx = getMaxIndex();
    if (index > maxIdx) index = maxIdx;
    if (index < 0) index = 0;

    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseInt(window.getComputedStyle(track).gap) || 0;
    
    const moveAmount = index * (cardWidth + gap);
    
    track.style.transform = `translateX(-${moveAmount}px)`;
    currentIndex = index;
    
    updateUI();
}

function updateUI() {
    const visibleCards = getVisibleCardsCount();

    // Atualiza Dots: No desktop (3 cards), o dot 2 deve brilhar 
    // quando o index for 1 (mostrando 2,3,4)
    dots.forEach((dot, i) => {
        dot.classList.toggle('current', i === currentIndex);
        
        // Esconde dots que não fazem sentido para a visualização atual
        // Ex: Se cabem 3 cards, só precisamos de 2 dots (index 0 e index 1)
        if (i > getMaxIndex()) {
            dot.style.display = 'none';
        } else {
            // Se for mobile, o CSS original já lida com o display, 
            // mas garantimos aqui a lógica.
            dot.style.display = (window.innerWidth <= 540) ? 'block' : (i < 2 ? 'block' : 'none');
        }
    });

    if (prevBtn && nextBtn) {
        prevBtn.classList.toggle('disabled', currentIndex === 0);
        nextBtn.classList.toggle('disabled', currentIndex >= getMaxIndex());
    }
}

// Eventos (Simplificados)
nextBtn?.addEventListener('click', () => moveCarousel(currentIndex + 1));
prevBtn?.addEventListener('click', () => moveCarousel(currentIndex - 1));

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => moveCarousel(i));
});

// --- Lógica de Swipe (Mantida e Ajustada) ---
let startX = 0;
let isDragging = false;

track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    track.style.transition = 'none';
}, { passive: true });

track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseInt(window.getComputedStyle(track).gap) || 0;
    const baseOffset = currentIndex * (cardWidth + gap);
    
    // Impede o arraste visual além do limite
    const move = baseOffset + diff;
    if (move > 0 && move < getMaxIndex() * (cardWidth + gap)) {
        track.style.transform = `translateX(-${move}px)`;
    }
}, { passive: true });

track.addEventListener('touchend', (e) => {
    isDragging = false;
    track.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
        moveCarousel(diff > 0 ? currentIndex + 1 : currentIndex - 1);
    } else {
        moveCarousel(currentIndex);
    }
});

window.addEventListener('resize', () => {
    // Se ao redimensionar o index ficar "órfão", reseta para o máximo permitido
    if (currentIndex > getMaxIndex()) currentIndex = getMaxIndex();
    moveCarousel(currentIndex);
});

// Init
moveCarousel(0);

});
