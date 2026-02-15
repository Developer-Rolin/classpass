document.addEventListener('DOMContentLoaded', () => {
    const selectContainer = document.getElementById('experienceSelectContainer');
    const customSelect = document.getElementById('customSelect');
    const options = document.querySelectorAll('.option');
    const hiddenInput = document.getElementById('experience');
    const selectedText = customSelect.querySelector('.selected-text');

    // Abre/Fecha o dropdown
    customSelect.addEventListener('click', (e) => {
        selectContainer.classList.toggle('active');
        e.stopPropagation();
    });

    // Seleciona uma opção
    options.forEach(option => {
        option.addEventListener('click', () => {
            const value = option.getAttribute('data-value');
            const text = option.textContent;

            // Atualiza o texto e o input escondido
            selectedText.textContent = text;
            hiddenInput.value = value;

            // Adiciona classe de "tem valor" para manter a label no topo
            selectContainer.classList.add('has-value');
            
            // Marca a opção como selecionada visualmente
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');

            // Fecha o menu
            selectContainer.classList.remove('active');
        });
    });

    // Fecha o dropdown se clicar fora dele
    document.addEventListener('click', () => {
        selectContainer.classList.remove('active');
    });
});