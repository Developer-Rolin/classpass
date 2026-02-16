document.addEventListener('DOMContentLoaded', () => {
    const selectContainer = document.getElementById('experienceSelectContainer');
    const customSelect = document.getElementById('customSelect');
    const options = document.querySelectorAll('.option');
    const hiddenInput = document.getElementById('experience');
    const selectedText = customSelect.querySelector('.selected-text');
    const form = document.getElementById('signupForm');
    const experienceInput = document.getElementById('experience');
    const checkbox = document.getElementById("marketing");
  

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

            // Valida input custom select
            selectContainer.classList.contains('has-value') ? selectContainer.classList.remove('invalid') : selectContainer.classList.add('invalid');
            
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



form.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Adiciona a classe que ativa as cores no CSS
    form.classList.add("was-validated");

    // Validação manual do Custom Select
    const isExperienceValid = !!experienceInput.value;
    
    if (!isExperienceValid) {
        selectContainer.classList.add("invalid");
    } 

    // Verifica se o formulário nativo está OK
    if (!form.checkValidity() || !isExperienceValid) {
        console.log("Erro na validação.");
        return;
    }

    // Sucesso
    const data = Object.fromEntries(new FormData(form));
    console.log("Sent Data:", data);
    location.pathname = "/thank-you.html";
});


});