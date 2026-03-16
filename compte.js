// Account page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load user data from localStorage
    loadUserData();

    // Profile editing functionality
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const profileEditForm = document.getElementById('profile-edit-form');
    const profileDisplay = document.getElementById('profile-display');
    const cancelEditBtn = document.getElementById('cancel-edit');
    const changeAvatarBtn = document.getElementById('change-avatar');

    editProfileBtn.addEventListener('click', function() {
        profileDisplay.style.display = 'none';
        profileEditForm.style.display = 'block';
    });

    cancelEditBtn.addEventListener('click', function() {
        profileEditForm.style.display = 'none';
        profileDisplay.style.display = 'block';
        // Reset form values
        loadUserData();
    });

    profileEditForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('edit-name').value;
        const email = document.getElementById('edit-email').value;
        const phone = document.getElementById('edit-phone').value;

        // Save to localStorage
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        if (phone) localStorage.setItem('userPhone', phone);

        // Update display
        document.getElementById('display-name').textContent = name;
        document.getElementById('display-email').textContent = email;

        // Hide form, show display
        profileEditForm.style.display = 'none';
        profileDisplay.style.display = 'block';

        showMessage('Profil mis à jour avec succès !', 'success');
    });

    changeAvatarBtn.addEventListener('click', function() {
        // Mock avatar change
        const avatars = [
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
            'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80',
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80'
        ];

        const currentAvatar = document.getElementById('profile-avatar').src;
        const currentIndex = avatars.findIndex(avatar => avatar === currentAvatar);
        const nextIndex = (currentIndex + 1) % avatars.length;

        document.getElementById('profile-avatar').src = avatars[nextIndex];
        localStorage.setItem('userAvatar', avatars[nextIndex]);

        showMessage('Avatar changé !', 'success');
    });

    // Preferences saving
    const savePreferencesBtn = document.querySelector('.preferences .btn');
    if (savePreferencesBtn) {
        savePreferencesBtn.addEventListener('click', function() {
            const checkedPreferences = document.querySelectorAll('.preference-item input:checked');
            const preferences = Array.from(checkedPreferences).map(cb => cb.parentElement.textContent.trim());

            localStorage.setItem('userPreferences', JSON.stringify(preferences));
            showMessage('Préférences sauvegardées !', 'success');
        });
    }

    // Load saved preferences
    loadUserPreferences();

    // Account settings buttons
    const settingsButtons = document.querySelectorAll('.account-settings .btn');
    settingsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent;
            if (action === 'Supprimer le Compte') {
                if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
                    // Clear all user data
                    localStorage.clear();
                    showMessage('Compte supprimé avec succès.', 'success');
                    setTimeout(() => {
                        window.location.href = 'auth.html';
                    }, 2000);
                }
            } else if (action === 'Changer le Mot de Passe') {
                showMessage('Fonctionnalité de changement de mot de passe à venir !', 'info');
            } else if (action === 'Notifications') {
                showMessage('Fonctionnalité de gestion des notifications à venir !', 'info');
            }
        });
    });

    // Recipe history
    const viewHistoryBtn = document.querySelector('.recipe-history .btn');
    if (viewHistoryBtn) {
        viewHistoryBtn.addEventListener('click', function() {
            showMessage('Historique complet à venir !', 'info');
        });
    }

    // Logout functionality
    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = 'Se déconnecter';
    logoutBtn.className = 'btn btn-secondary';
    logoutBtn.style.marginTop = '20px';
    logoutBtn.addEventListener('click', function() {
        if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'auth.html';
        }
    });

    // Add logout button to the page
    const accountSection = document.querySelector('.account-section');
    accountSection.appendChild(logoutBtn);

    function loadUserData() {
        const userName = localStorage.getItem('username') || localStorage.getItem('userName') || 'Jean Dupont';
        const userEmail = localStorage.getItem('userEmail') || 'jean.dupont@email.com';
        const userPhone = localStorage.getItem('userPhone') || '';
        const userAvatar = localStorage.getItem('userAvatar') || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80';

        document.getElementById('display-name').textContent = userName;
        document.getElementById('display-email').textContent = userEmail;
        document.getElementById('edit-name').value = userName;
        document.getElementById('edit-email').value = userEmail;
        document.getElementById('edit-phone').value = userPhone;
        document.getElementById('profile-avatar').src = userAvatar;
    }

    function loadUserPreferences() {
        const savedPreferences = JSON.parse(localStorage.getItem('userPreferences') || '[]');
        const checkboxes = document.querySelectorAll('.preference-item input');

        checkboxes.forEach(checkbox => {
            const preferenceText = checkbox.parentElement.textContent.trim();
            if (savedPreferences.includes(preferenceText)) {
                checkbox.checked = true;
            }
        });
    }

    function showMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.account-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `account-message ${type}`;
        messageDiv.textContent = message;

        // Insert at top of account section
        const accountSection = document.querySelector('.account-section');
        accountSection.insertBefore(messageDiv, accountSection.firstChild);

        // Auto remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    // Check if user is logged in
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'auth.html';
    }
});