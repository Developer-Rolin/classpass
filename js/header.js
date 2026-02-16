document.addEventListener('DOMContentLoaded', () => {

    // Menu Mobile Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const header = document.querySelector('header');

    header.addEventListener("click", function (e) {
        const isHeader = e.target.tagName === "HEADER" || e.target.className == "nav-container";        
        if (isHeader) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {

            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');


            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                document.body.classList.add('opened-menu');
            } else {
                document.body.style.overflow = 'auto';
                document.body.classList.remove('opened-menu');
            }
        });
    }

    document.querySelectorAll('.mobile-menu-list a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });




})