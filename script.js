// Responsive Navbar
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();

    if (email === '') {
        alert('Please fill in all fields.');
    } else if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
    } else {
        const subject = 'New Subscriber';
        const body = 'Please I would like to subscribe to your newsletter';

        // Construct the mailto URL with subject and body
        const mailtoUrl = 'mailto:j.chukwuony@alustudent.com' +
                          '?subject=' + encodeURIComponent(subject) +
                          '&body=' + encodeURIComponent(body);

        // Open the default email client with the mailto URL
        window.location.href = mailtoUrl;

        // Optionally, reset the form after submission
        contactForm.reset();
    }
});

function isValidEmail(email) {
    // Regular expression for validating email addresses
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Toggle menu for mobile view
document.querySelector('.menu-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
});
