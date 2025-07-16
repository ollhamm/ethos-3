document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.navbar-toggle');
    const menu = document.querySelector('.navbar-menu');

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
});
