// script.js

document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    
    sidebarLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});
