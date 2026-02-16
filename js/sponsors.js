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




});