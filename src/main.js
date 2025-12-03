// EmailJS initialization
emailjs.init("DaZnMybJA8Sxi2B53");

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Smooth scroll behavior is handled by CSS scroll-smooth class

// Before/After fade functionality
const fadeContainers = document.querySelectorAll('.before-after-fade');

fadeContainers.forEach(container => {
    const afterImg = container.querySelector('.after-img');

    if (afterImg) {
        setInterval(() => {
            // Fade to after
            afterImg.style.opacity = '1';

            // Fade back to before after 2 seconds
            setTimeout(() => {
                afterImg.style.opacity = '0';
            }, 2000);
        }, 4000); // Complete cycle every 4 seconds
    }
});

// Contact form handling with EmailJS
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;

        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span>Sending...</span>';

        try {
            // Collect all form data
            const formData = new FormData(contactForm);

            // Create a formatted message with all fields
            const messageContent = `
NEW CONTACT FORM SUBMISSION

Contact Information:
Name: ${formData.get('user_name')}
Email: ${formData.get('user_email')}
Phone: ${formData.get('user_phone')}

Project Details:
${formData.get('project_details')}
            `.trim();

            // Create formatted fields display
            const allFieldsContent = `
Contact Information:
Name: ${formData.get('user_name')}
Email: ${formData.get('user_email')}
Phone: ${formData.get('user_phone')}

Project Details:
${formData.get('project_details')}
            `.trim();

            // Prepare template parameters
            const templateParams = {
                to_email: formData.get('to_email'),
                site_name: formData.get('site_name'),
                user_name: formData.get('user_name'),
                user_email: formData.get('user_email'),
                user_phone: formData.get('user_phone'),
                project_details: formData.get('project_details'),
                message: messageContent,
                all_fields: allFieldsContent
            };

            // Send via EmailJS
            const response = await emailjs.send('service_dkq1ms1', 'template_emtp66c', templateParams);
            
            console.log('EmailJS Success:', response);

            // Success popup
            showSuccessPopup();
            contactForm.reset();

        } catch (error) {
            console.error('EmailJS Error:', error);
            console.error('Error details:', error.text || error.message);
            showErrorPopup();
        } finally {
            // Re-enable button
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });
}

// Success popup
function showSuccessPopup() {
    const popup = document.createElement('div');
    popup.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
    popup.innerHTML = `
        <div class="fixed inset-0 bg-black opacity-50"></div>
        <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative z-10 transform transition-all">
            <div class="text-center">
                <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-sky-100 mb-4">
                    <svg class="h-10 w-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h3 class="text-2xl font-semibold text-primary mb-2">Message Sent!</h3>
                <p class="text-gray-600 mb-6 font-light">Thank you for reaching out! We'll get back to you soon.</p>
                <button onclick="this.closest('.fixed').remove()" 
                    class="bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg">
                    Close
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (popup.parentNode) {
            popup.remove();
        }
    }, 5000);
}

// Error popup
function showErrorPopup() {
    const popup = document.createElement('div');
    popup.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
    popup.innerHTML = `
        <div class="fixed inset-0 bg-black opacity-50"></div>
        <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative z-10 transform transition-all">
            <div class="text-center">
                <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                    <svg class="h-10 w-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </div>
                <h3 class="text-2xl font-semibold text-primary mb-2">Oops!</h3>
                <p class="text-gray-600 mb-2 font-light">There was an error sending your message.</p>
                <p class="text-gray-600 mb-6 font-light">Please call us directly at <a href="tel:9788468058" class="text-accent font-medium hover:text-accent-light">(978) 846-8058</a></p>
                <button onclick="this.closest('.fixed').remove()" 
                    class="bg-gradient-to-r from-accent to-accent-light hover:from-accent-dark hover:to-accent text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg">
                    Close
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
}