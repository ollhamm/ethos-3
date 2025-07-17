document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.navbar-toggle');
    const menu = document.querySelector('.navbar-menu');
    const navbar = document.querySelector('.navbar');
    const logoImg = document.querySelector('.navbar-logo img');

    if (toggle && menu) {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            menu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (menu.classList.contains('active')) {
                if (!menu.contains(e.target) && !toggle.contains(e.target)) {
                    menu.classList.remove('active');
                }
            }
        });
    } else {
        console.error('Navbar elements not found!');
    }

    // Navbar fixed on scroll
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 20) {
                if (!navbar.classList.contains('fixed')) {
                    navbar.classList.add('fixed');
                }
                if (logoImg) logoImg.src = 'images/logo-blue.png';
            } else {
                navbar.classList.remove('fixed');
                if (logoImg) logoImg.src = 'images/logo-white.png';
            }
        });
    }
});