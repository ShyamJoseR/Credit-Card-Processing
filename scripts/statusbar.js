// // script.js

// document.addEventListener('DOMContentLoaded', () => {
//     const currentPath = window.location.pathname;
//     const sidebarLinks = document.querySelectorAll('.sidebar a');
    
//     sidebarLinks.forEach(link => {
//         if (link.getAttribute('href') === currentPath) {
//             link.classList.add('active');
//         }
//     });
// });


// script.js


// script.js

// script.js

document.addEventListener('DOMContentLoaded', () => {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('collapsed');
    });

    const currentPath = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('.sidebar a');

    sidebarLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});
