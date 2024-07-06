document.getElementById('trigram').addEventListener('click', function() {
    var sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('expanded');
    sidebar.classList.toggle('collapsed');

    var email = document.getElementById('E-mail');
    email.classList.toggle('expanded');
    email.classList.toggle('collapsed');

    var trigram = document.getElementById('trigram');
    trigram.classList.toggle('expanded');
    trigram.classList.toggle('collapsed');


});

document.getElementById('E-mail').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor click behavior

    var email = 'shyamjose.r@gmail.com';
    var subject = 'Credit WebPage - Suggestions';
    var body = 'Page URL: ' + window.location.href  + '\n\nPlease enter your suggestions below:\n';
    
    var mailtoLink = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    
    window.location.href = mailtoLink;
});
