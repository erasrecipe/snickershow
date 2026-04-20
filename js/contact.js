// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Create mailto link
            const mailtoLink = `mailto:snickershow1@gmail.com?subject=${encodeURIComponent('[SnickerShow Contact] ' + formData.subject + ' - from ' + formData.name)}&body=${encodeURIComponent(
                'Name: ' + formData.name + '\n' +
                'Email: ' + formData.email + '\n' +
                'Subject: ' + formData.subject + '\n\n' +
                'Message:\n' + formData.message + '\n\n' +
                '---\n' +
                'Sent from SnickerShow Contact Form'
            )}`;

            // Open email client
            window.location.href = mailtoLink;

            // Show success message
            showStatus('success', '✓ Opening your email client... Please send the email to complete your message.');
            
            // Reset form after a delay
            setTimeout(() => {
                contactForm.reset();
            }, 2000);
        });
    }

    function showStatus(type, message) {
        formStatus.className = 'form-status ' + type;
        formStatus.textContent = message;
        formStatus.style.display = 'block';

        // Hide after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }

    // Form validation enhancement
    const requiredFields = contactForm.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.style.borderColor = '#ef4444';
        });

        field.addEventListener('input', function() {
            if (this.validity.valid) {
                this.style.borderColor = '';
            }
        });
    });

    // Email validation
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                showStatus('error', '⚠️ Please enter a valid email address');
            }
        });
    }
});
