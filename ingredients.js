// Recipe finder functionality with database
let allRecipes = [];
let userIngredients = [];

document.addEventListener('DOMContentLoaded', async function() {
    // Load recipes from database
    await loadRecipes();

    const ingredientInput = document.getElementById('ingredient-input');
    const addBtn = document.getElementById('add-btn');
    const clearBtn = document.getElementById('clear-btn');
    const findRecipesBtn = document.getElementById('find-recipes-btn');
    const ingredientsUl = document.getElementById('ingredients-ul');
    const recipesSection = document.getElementById('recipes-section');
    const recipesContainer = document.getElementById('recipes-container');

    // Add ingredient
    addBtn.addEventListener('click', addIngredient);
    ingredientInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addIngredient();
        }
    });

    // Clear all ingredients
    clearBtn.addEventListener('click', function() {
        userIngredients = [];
        updateIngredientsList();
        recipesSection.style.display = 'none';
    });

    // Find recipes
    findRecipesBtn.addEventListener('click', findRecipes);

    function addIngredient() {
        const ingredient = ingredientInput.value.trim().toLowerCase();
        if (ingredient && !userIngredients.includes(ingredient)) {
            userIngredients.push(ingredient);
            updateIngredientsList();
            ingredientInput.value = '';
        }
    }

    function updateIngredientsList() {
        ingredientsUl.innerHTML = '';
        userIngredients.forEach((ingredient, index) => {
            const li = document.createElement('li');
            li.textContent = ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
            const removeBtn = document.createElement('button');
            removeBtn.textContent = '×';
            removeBtn.className = 'remove-btn';
            removeBtn.onclick = () => removeIngredient(index);
            li.appendChild(removeBtn);
            ingredientsUl.appendChild(li);
        });
    }

    function removeIngredient(index) {
        userIngredients.splice(index, 1);
        updateIngredientsList();
    }

    function findRecipes() {
        if (userIngredients.length === 0) {
            alert('Veuillez ajouter au moins un ingrédient !');
            return;
        }

        const matchingRecipes = findMatchingRecipes(userIngredients);
        displayRecipes(matchingRecipes);
    }

    function findMatchingRecipes(ingredients) {
        return allRecipes.filter(recipe => {
            // Check if recipe contains any of the user's ingredients
            return recipe.ingredients.some(ingredient =>
                ingredients.some(userIng =>
                    ingredient.toLowerCase().includes(userIng.toLowerCase()) ||
                    userIng.toLowerCase().includes(ingredient.toLowerCase())
                )
            );
        }).slice(0, 50); // Limit to 50 results for performance
    }

    function displayRecipes(recipeList) {
        recipesContainer.innerHTML = '';

        if (recipeList.length === 0) {
            recipesContainer.innerHTML = '<p>Aucune recette trouvée avec ces ingrédients. Essayez d\'ajouter d\'autres ingrédients ou des termes plus généraux !</p>';
        } else {
            recipeList.forEach(recipe => {
                const recipeCard = document.createElement('div');
                recipeCard.className = 'recipe-card';
                recipeCard.innerHTML = `
                    <img src="${recipe.image}" alt="${recipe.name}">
                    <h3>${recipe.name}</h3>
                    <p>${recipe.description}</p>
                    <div class="recipe-meta">
                        <span class="rating">${recipe.rating}</span>
                        <span class="time">${recipe.time}</span>
                        <span class="difficulty">${recipe.difficulty}</span>
                    </div>
                    <div class="recipe-ingredients">
                        <strong>Ingrédients clés :</strong> ${recipe.ingredients.slice(0, 4).join(', ')}${recipe.ingredients.length > 4 ? '...' : ''}
                    </div>
                    <div class="recipe-actions">
                        <button class="btn favorite-btn" data-recipe-id="${recipe.id}">☆ Ajouter aux Favoris</button>
                        <button class="btn">Voir la Recette</button>
                    </div>
                `;
                recipesContainer.appendChild(recipeCard);
            });
        }

        recipesSection.style.display = 'block';
        recipesSection.scrollIntoView({ behavior: 'smooth' });

        // Add event listeners for favorite buttons
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const recipeId = this.getAttribute('data-recipe-id');
                addToFavorites(recipeId);
                this.textContent = '★ Ajouté aux Favoris';
                this.disabled = true;
            });
        });
    }

    function addToFavorites(recipeId) {
        const recipe = allRecipes.find(r => r.id == recipeId);
        if (recipe) {
            let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            if (!favorites.some(fav => fav.id == recipeId)) {
                favorites.push(recipe);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                alert(`${recipe.name} ajouté aux favoris !`);
            } else {
                alert('Cette recette est déjà dans vos favoris !');
            }
        }
    }

    async function loadRecipes() {
        try {
            const response = await fetch('recipes_database.json');
            allRecipes = await response.json();
            console.log(`Loaded ${allRecipes.length} recipes from database`);
        } catch (error) {
            console.error('Error loading recipes:', error);
            // Fallback to basic recipes if JSON fails to load
            allRecipes = [
                {
                    name: "Recette de secours",
                    ingredients: ["ingrédient"],
                    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
                    description: "Recette de secours en cas d'erreur de chargement.",
                    rating: "★★★★☆",
                    time: "30 min",
                    difficulty: "Facile"
                }
            ];
        }
    }
});