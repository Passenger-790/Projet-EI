// Authentication page functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    // Tab switching
    loginTab.addEventListener('click', () => switchTab('login'));
    signupTab.addEventListener('click', () => switchTab('signup'));

    function switchTab(tab) {
        // Remove active class from tabs
        loginTab.classList.remove('active');
        signupTab.classList.remove('active');

        // Hide all forms
        loginForm.classList.remove('active');
        signupForm.classList.remove('active');

        // Show selected tab and form
        if (tab === 'login') {
            loginTab.classList.add('active');
            loginForm.classList.add('active');
        } else {
            signupTab.classList.add('active');
            signupForm.classList.add('active');
        }
    }

    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const rememberMe = document.getElementById('remember-me').checked;

        // Basic validation
        if (!email || !password) {
            showMessage('Veuillez remplir tous les champs.', 'error');
            return;
        }

        // Simulate login (in real app, this would be an API call)
        showMessage('Connexion en cours...', 'info');

        setTimeout(() => {
            // Mock successful login
            localStorage.setItem('userEmail', email);
            localStorage.setItem('isLoggedIn', 'true');
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
            }

            showMessage('Connexion réussie ! Redirection...', 'success');
            setTimeout(() => {
                window.location.href = 'compte.html';
            }, 1000);
        }, 1500);
    });

    // Signup form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        const acceptTerms = document.getElementById('accept-terms').checked;

        // Validation
        if (!username || !email || !password || !confirmPassword) {
            showMessage('Veuillez remplir tous les champs.', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showMessage('Les mots de passe ne correspondent pas.', 'error');
            return;
        }

        if (password.length < 6) {
            showMessage('Le mot de passe doit contenir au moins 6 caractères.', 'error');
            return;
        }

        if (!acceptTerms) {
            showMessage('Veuillez accepter les conditions d\'utilisation.', 'error');
            return;
        }

        // Simulate signup
        showMessage('Inscription en cours...', 'info');

        setTimeout(() => {
            // Mock successful signup
            localStorage.setItem('userEmail', email);
            localStorage.setItem('username', username);
            localStorage.setItem('isLoggedIn', 'true');

            showMessage('Inscription réussie ! Redirection...', 'success');
            setTimeout(() => {
                window.location.href = 'compte.html';
            }, 1000);
        }, 1500);
    });

    // Social login buttons (mock functionality)
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.classList.contains('google-btn') ? 'Google' : 'Facebook';
            showMessage(`Connexion avec ${provider} en cours...`, 'info');
            setTimeout(() => {
                showMessage('Fonctionnalité à venir !', 'info');
            }, 1000);
        });
    });

    // Forgot password
    document.querySelector('.forgot-password').addEventListener('click', function(e) {
        e.preventDefault();
        showMessage('Fonctionnalité de récupération de mot de passe à venir !', 'info');
    });

    function showMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.auth-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `auth-message ${type}`;
        messageDiv.textContent = message;

        // Insert after auth tabs
        const authTabs = document.querySelector('.auth-tabs');
        authTabs.insertAdjacentElement('afterend', messageDiv);

        // Auto remove after 5 seconds for success/info
        if (type === 'success' || type === 'info') {
            setTimeout(() => {
                messageDiv.remove();
            }, 5000);
        }
    }

    // Check if user is already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'compte.html';
    }
});