// Favorites page functionality with database
let allRecipes = [];
let userFavorites = [];

document.addEventListener('DOMContentLoaded', async function() {
    // Load recipes from database
    await loadRecipes();

    // Load user favorites from localStorage
    loadUserFavorites();

    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');
    const favoritesGrid = document.getElementById('favorites-grid');
    const noFavorites = document.getElementById('no-favorites');

    // Display initial favorites
    displayFavorites();

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            filterFavorites(filter);
        });
    });

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        searchFavorites(searchTerm);
    });

    function displayFavorites(filteredRecipes = null) {
        const recipesToShow = filteredRecipes || getFavoriteRecipes();
        favoritesGrid.innerHTML = '';

        if (recipesToShow.length === 0) {
            noFavorites.style.display = 'block';
        } else {
            noFavorites.style.display = 'none';
            recipesToShow.forEach(recipe => {
                const favoriteCard = document.createElement('div');
                favoriteCard.className = 'favorite-card';
                favoriteCard.setAttribute('data-category', recipe.category);
                favoriteCard.innerHTML = `
                    <div class="favorite-image">
                        <img src="${recipe.image}" alt="${recipe.name}">
                        <button class="remove-favorite" data-id="${recipe.id}">♥</button>
                    </div>
                    <div class="favorite-content">
                        <h3>${recipe.name}</h3>
                        <p>${recipe.description}</p>
                        <div class="favorite-meta">
                            <span class="rating">${recipe.rating}</span>
                            <span class="time">${recipe.time}</span>
                            <span class="difficulty">${recipe.difficulty}</span>
                        </div>
                        <button class="btn">Voir la Recette</button>
                    </div>
                `;
                favoritesGrid.appendChild(favoriteCard);
            });

            // Add event listeners to new buttons
            addFavoriteEventListeners();
        }
    }

    function addFavoriteEventListeners() {
        // Remove favorite functionality
        const removeButtons = document.querySelectorAll('.remove-favorite');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const recipeId = parseInt(this.getAttribute('data-id'));
                const card = this.closest('.favorite-card');
                const recipeName = card.querySelector('h3').textContent;

                if (confirm(`Retirer "${recipeName}" de vos favoris ?`)) {
                    removeFromFavorites(recipeId);
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.remove();
                        checkEmptyFavorites();
                    }, 300);
                }
            });
        });

        // View recipe buttons
        const viewRecipeButtons = document.querySelectorAll('.favorite-content .btn');
        viewRecipeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const card = this.closest('.favorite-card');
                const recipeName = card.querySelector('h3').textContent;
                alert(`Ouverture de la recette détaillée pour "${recipeName}"...`);
            });
        });
    }

    function filterFavorites(filter) {
        let filteredRecipes;
        if (filter === 'all') {
            filteredRecipes = getFavoriteRecipes();
        } else {
            filteredRecipes = getFavoriteRecipes().filter(recipe => recipe.category === filter);
        }
        displayFavorites(filteredRecipes);
    }

    function searchFavorites(searchTerm) {
        let filteredRecipes;
        if (searchTerm.trim() === '') {
            filteredRecipes = getFavoriteRecipes();
        } else {
            filteredRecipes = getFavoriteRecipes().filter(recipe =>
                recipe.name.toLowerCase().includes(searchTerm) ||
                recipe.description.toLowerCase().includes(searchTerm) ||
                recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm))
            );
        }
        displayFavorites(filteredRecipes);
    }

    function getFavoriteRecipes() {
        return userFavorites;
    }

    function addToFavorites(recipeId) {
        const recipe = allRecipes.find(r => r.id == recipeId);
        if (recipe && !userFavorites.some(fav => fav.id == recipeId)) {
            userFavorites.push(recipe);
            saveUserFavorites();
        }
    }

    function removeFromFavorites(recipeId) {
        userFavorites = userFavorites.filter(recipe => recipe.id != recipeId);
        saveUserFavorites();
    }

    function saveUserFavorites() {
        localStorage.setItem('favorites', JSON.stringify(userFavorites));
    }

    function loadUserFavorites() {
        const saved = localStorage.getItem('favorites');
        userFavorites = saved ? JSON.parse(saved) : [];

        // If no favorites, add some default ones for demo
        if (userFavorites.length === 0) {
            // Add some default favorites from the database
            const defaultFavorites = allRecipes.slice(0, 6);
            userFavorites = defaultFavorites;
            saveUserFavorites();
        }
    }

    function checkEmptyFavorites() {
        const currentCards = document.querySelectorAll('.favorite-card');
        if (currentCards.length === 0) {
            noFavorites.style.display = 'block';
        }
    }

    async function loadRecipes() {
        try {
            const response = await fetch('recipes_database.json');
            allRecipes = await response.json();
            console.log(`Loaded ${allRecipes.length} recipes from database for favorites`);
        } catch (error) {
            console.error('Error loading recipes:', error);
            allRecipes = [];
        }
    }

    // Make functions available globally for adding favorites from other pages
    window.addToFavorites = addToFavorites;
    window.removeFromFavorites = removeFromFavorites;
});