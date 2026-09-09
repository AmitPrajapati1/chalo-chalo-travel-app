// Main JavaScript for Chalo Chale Travel App

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavbar();
    initForms();
    initModals();
    initAnimations();
    initSearch();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar-custom');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // Active link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath.includes(href) && href !== '#')) {
            link.classList.add('active');
        }
    });
}

// Form handling
function initForms() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegister();
        });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContact();
        });
    }

    // Booking form
    const bookingForms = document.querySelectorAll('form[action=""]');
    bookingForms.forEach(form => {
        if (form.closest('#exampleModal')) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                handleBooking();
            });
        }
    });
}

// Login handler
function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Simple validation
    if (!email || !password) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }

    // Simulate login (replace with actual API call)
    const loginBtn = document.querySelector('#loginForm button[type="submit"]');
    loginBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Logging in...';
    loginBtn.disabled = true;

    setTimeout(() => {
        showAlert('Login successful! Welcome back.', 'success');
        const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        loginModal.hide();
        loginBtn.innerHTML = 'Login';
        loginBtn.disabled = false;
        
        // Store user session (simplified)
        if (rememberMe) {
            localStorage.setItem('userEmail', email);
        }
    }, 1500);
}

// Register handler
function handleRegister() {
    const firstName = document.getElementById('registerFirstName').value;
    const lastName = document.getElementById('registerLastName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    // Validation
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }

    if (password !== confirmPassword) {
        showAlert('Passwords do not match', 'danger');
        return;
    }

    if (!agreeTerms) {
        showAlert('Please agree to the terms and conditions', 'danger');
        return;
    }

    // Simulate registration
    const registerBtn = document.querySelector('#registerForm button[type="submit"]');
    registerBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Creating account...';
    registerBtn.disabled = true;

    setTimeout(() => {
        showAlert('Account created successfully! Please login.', 'success');
        const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        registerModal.hide();
        
        // Switch to login modal
        setTimeout(() => {
            const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
            loginModal.show();
        }, 500);
        
        registerBtn.innerHTML = 'Create Account';
        registerBtn.disabled = false;
    }, 1500);
}

// Contact form handler
function handleContact() {
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;

    if (!name || !email || !subject || !message) {
        showAlert('Please fill in all fields', 'danger');
        return;
    }

    const contactBtn = document.querySelector('#contactForm button[type="submit"]');
    contactBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
    contactBtn.disabled = true;

    setTimeout(() => {
        showAlert('Message sent successfully! We will get back to you soon.', 'success');
        document.getElementById('contactForm').reset();
        contactBtn.innerHTML = 'Send Message';
        contactBtn.disabled = false;
    }, 1500);
}

// Booking handler
function handleBooking() {
    const name = document.getElementById('bookingName').value;
    const email = document.getElementById('bookingEmail').value;
    const destination = document.getElementById('bookingDestination').value;
    const date = document.getElementById('bookingDate').value;
    const people = document.getElementById('bookingPeople').value;

    if (!name || !email || !destination || !date || !people) {
        showAlert('Please fill in all required fields', 'danger');
        return;
    }

    const bookingBtn = document.querySelector('#exampleModal .btn-submit');
    bookingBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
    bookingBtn.disabled = true;

    setTimeout(() => {
        showAlert('Booking request submitted successfully! We will contact you shortly.', 'success');
        const bookingModal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        bookingModal.hide();
        
        // Reset form
        document.querySelector('#exampleModal form').reset();
        bookingBtn.innerHTML = 'Submit Booking Request';
        bookingBtn.disabled = false;
    }, 1500);
}

// Modal initialization
function initModals() {
    // Auto-focus on first input when modal opens
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('shown.bs.modal', function() {
            const firstInput = this.querySelector('input[type="text"], input[type="email"], input[type="password"]');
            if (firstInput) {
                firstInput.focus();
            }
        });
    });
}

// Animations
function initAnimations() {
    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards and sections
    const animatedElements = document.querySelectorAll('.card, .section-title, .col');
    animatedElements.forEach(el => observer.observe(el));
}

// Search functionality
function initSearch() {
    const searchForms = document.querySelectorAll('form.d-flex');
    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input[type="text"]');
            const query = searchInput.value.trim();
            
            if (query) {
                // Redirect to search results or filter current page
                showAlert(`Searching for: ${query}`, 'info');
                // Implement actual search logic here
            }
        });
    });
}

// Alert notification system
function showAlert(message, type = 'info') {
    // Remove existing alerts
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `custom-alert alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    document.body.appendChild(alertDiv);

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);

    // Initialize Bootstrap alert
    const bsAlert = new bootstrap.Alert(alertDiv);
}

// Destination filter functionality
function filterDestinations(category) {
    const cards = document.querySelectorAll('.destination-card');
    
    cards.forEach(card => {
        const cardCategory = card.dataset.category;
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
        }
    });

    // Update active button
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
}

// Package filter functionality
function filterPackages(type) {
    const cards = document.querySelectorAll('.package-card');
    
    cards.forEach(card => {
        const cardType = card.dataset.type;
        if (type === 'all' || cardType === type) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
        }
    });

    // Update active button
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.type === type) {
            btn.classList.add('active');
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Image lazy loading
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// Password strength indicator
function checkPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;

    return strength;
}

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[+]?[\d\s-()]+$/;
    return re.test(phone) && phone.replace(/\D/g,).length >= 10;
}

// Local storage helpers
function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

function getFromLocalStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (e) {
        console.error('Error reading from localStorage:', e);
        return null;
    }
}

// Initialize filter buttons if they exist
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category || this.dataset.type;
            if (this.closest('#destinations')) {
                filterDestinations(category);
            } else if (this.closest('#packages')) {
                filterPackages(category);
            }
        });
    });
});
