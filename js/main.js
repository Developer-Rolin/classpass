document.addEventListener('DOMContentLoaded', () => {


//Sponsors Section
    const buttons = document.querySelectorAll('.selector-btn');
    const tabs = document.querySelectorAll('.sponsor-tab');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Remove classe 'active' de todos os botões
            buttons.forEach(b => b.classList.remove('active'));

            // 2. Adiciona 'active' no botão clicado
            btn.classList.add('active');

            // 3. Esconde todas as abas de conteúdo
            tabs.forEach(tab => tab.classList.remove('active'));

            // 4. Mostra a aba que corresponde ao data-sponsor do botão
            const targetId = btn.getAttribute('data-sponsor');
            document.getElementById(targetId).classList.add('active');
        });
    });



    // ==================================
// SPOTLIGHT CAROUSEL
// ==================================

const spotlightTrack = document.querySelector('.spotlight-track');
  const carouselButtons = document.querySelectorAll('.carousel-nav-btn');
  const paginationButtons = document.querySelectorAll('.carousel-pagination button');

  if (!spotlightTrack) return;

  carouselButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('disabled')) return;
      const side = btn.id === 'spotlightPrevBtn' ? 'left' : 'right';
      fullNav(side, btn);
    });
  });

  paginationButtons.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      if (dot.classList.contains('current')) return;
      
      if (window.innerWidth < 540) {
        // Mobile: navega card por card
        const cardSize = spotlightTrack.clientWidth;
        const distance = index === 0 ? 0 : -1 * cardSize * index + index * 20;
        spotlightTrack.style.transform = `translateX(${distance}px)`;
        document.querySelector('.carousel-pagination button.current').classList.remove('current');
        dot.classList.add('current');
      } else {
        // Desktop/Tablet: navega por página
        const side = index === 0 ? 'left' : 'right';
        const btn = document.querySelector('.carousel-nav-btn:not(.disabled)');
        fullNav(side, btn);
      }
    });
  });

  function fullNav(side, btn) {
    const scrollWidth = spotlightTrack.clientWidth;
    const containerWidth = spotlightTrack.parentElement.scrollWidth;

    document.querySelector('.carousel-nav-btn.disabled').classList.remove('disabled');
    btn.classList.add('disabled');
    
    const distance = side === 'right' ? -(containerWidth - scrollWidth - 20) : 0;
    spotlightTrack.style.transform = `translateX(${distance}px)`;
    
    paginationButtons[side === 'right' ? 1 : 0].classList.add('current');
    paginationButtons[side === 'right' ? 0 : 1].classList.remove('current');
  }

  const getSize = () => (window.innerWidth < 540 ? 'small' : 'big');
  let currentSize = getSize();
  
  window.addEventListener('resize', () => {
    if (currentSize !== getSize()) {
      spotlightTrack.style.transform = `translateX(0px)`;
      carouselButtons[0].classList.add('disabled');
      carouselButtons[1].classList.remove('disabled');
      paginationButtons.forEach(el => el.classList.remove('current'));
      paginationButtons[0].classList.add('current');
      currentSize = getSize();
    }
  });

  // Navegação por teclado
  document.querySelector('.spotlight').addEventListener('keyup', e => {
    if (e.key === 'Tab') {
      const index = e.target.getAttribute('read-tab-index');
      const prev = document.querySelector('#spotlightPrevBtn:not(.disabled)');
      const next = document.querySelector('#spotlightNextBtn:not(.disabled)');
      
      if (index === '0' || (index === '1' && prev)) {
        prev?.click();
      }

      if (index === '2' || (index === '3' && next)) {
        next?.click();
      }
    }
  });


});