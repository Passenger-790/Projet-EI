import json
import random

# Comprehensive recipe database generator
def generate_recipes():
    # Base ingredients for keyword matching
    ingredients_db = {
        'proteins': ['poulet', 'boeuf', 'porc', 'saumon', 'thon', 'crevettes', 'tofu', 'lentilles', 'haricots', 'oeufs', 'fromage'],
        'vegetables': ['tomate', 'carotte', 'oignon', 'ail', 'poivron', 'brocoli', 'épinards', 'courgette', 'aubergine', 'champignons', 'salade'],
        'grains': ['riz', 'pâtes', 'quinoa', 'couscous', 'pain', 'farine', 'semoule', 'orge', 'blé'],
        'dairy': ['lait', 'crème', 'beurre', 'fromage', 'yaourt', 'crème fraîche'],
        'fruits': ['pomme', 'banane', 'orange', 'citron', 'fraise', 'framboise', 'raisin', 'poire', 'pêche'],
        'herbs_spices': ['basilic', 'persil', 'thym', 'romarin', 'curry', 'paprika', 'cumin', 'cannelle', 'gingembre', 'poivre'],
        'oils': ['huile d\'olive', 'huile de tournesol', 'huile de coco', 'vinaigre'],
        'sweets': ['sucre', 'chocolat', 'vanille', 'miel', 'sirop d\'érable']
    }

    # Recipe templates
    recipe_templates = [
        # Breakfast recipes
        {"name": "Omelette aux {}", "category": "breakfast", "time": "15 min", "difficulty": "Facile"},
        {"name": "Pancakes à la {}", "category": "breakfast", "time": "20 min", "difficulty": "Facile"},
        {"name": "Smoothie {} et {}", "category": "breakfast", "time": "5 min", "difficulty": "Facile"},
        {"name": "Yaourt grec au {} et {}", "category": "breakfast", "time": "10 min", "difficulty": "Facile"},
        {"name": "Tartines grillées au {} et {}", "category": "breakfast", "time": "10 min", "difficulty": "Facile"},

        # Lunch recipes
        {"name": "Salade de {} et {}", "category": "lunch", "time": "15 min", "difficulty": "Facile"},
        {"name": "Wrap au {} et {}", "category": "lunch", "time": "10 min", "difficulty": "Facile"},
        {"name": "Quinoa au {} et {}", "category": "lunch", "time": "25 min", "difficulty": "Facile"},
        {"name": "Soupe de {} au {}", "category": "lunch", "time": "30 min", "difficulty": "Facile"},
        {"name": "Sandwich au {} et {}", "category": "lunch", "time": "10 min", "difficulty": "Facile"},

        # Dinner recipes
        {"name": "{} aux {}", "category": "dinner", "time": "45 min", "difficulty": "Moyen"},
        {"name": "Curry de {} au {}", "category": "dinner", "time": "40 min", "difficulty": "Moyen"},
        {"name": "{} sauté aux {}", "category": "dinner", "time": "25 min", "difficulty": "Facile"},
        {"name": "Gratin de {} et {}", "category": "dinner", "time": "50 min", "difficulty": "Moyen"},
        {"name": "Tagine de {} aux {}", "category": "dinner", "time": "60 min", "difficulty": "Difficile"},

        # Dessert recipes
        {"name": "Tarte aux {}", "category": "dessert", "time": "60 min", "difficulty": "Moyen"},
        {"name": "Mousse au {}", "category": "dessert", "time": "30 min", "difficulty": "Facile"},
        {"name": "Crème {} au {}", "category": "dessert", "time": "20 min", "difficulty": "Facile"},
        {"name": "Gâteau au {} et {}", "category": "dessert", "time": "75 min", "difficulty": "Difficile"},
        {"name": "Compote de {} au {}", "category": "dessert", "time": "25 min", "difficulty": "Facile"}
    ]

    recipes = []
    recipe_id = 1

    # Generate 300+ recipes
    for template in recipe_templates:
        for i in range(20):  # 20 variations per template = 300 recipes
            # Select random ingredients based on template
            if "{}" in template["name"]:
                placeholders = template["name"].count("{}")
                selected_ingredients = []

                for _ in range(placeholders):
                    # Choose ingredient category based on recipe type
                    if template["category"] == "breakfast":
                        category = random.choice(['proteins', 'fruits', 'dairy', 'grains'])
                    elif template["category"] == "lunch":
                        category = random.choice(['vegetables', 'proteins', 'grains'])
                    elif template["category"] == "dinner":
                        category = random.choice(['proteins', 'vegetables', 'herbs_spices'])
                    else:  # dessert
                        category = random.choice(['fruits', 'dairy', 'sweets'])

                    ingredient = random.choice(ingredients_db[category])
                    selected_ingredients.append(ingredient)

                recipe_name = template["name"].format(*selected_ingredients)
            else:
                recipe_name = template["name"]
                selected_ingredients = []

            # Create ingredient list for the recipe
            all_ingredients = selected_ingredients.copy()

            # Add complementary ingredients
            if template["category"] == "breakfast":
                all_ingredients.extend(random.sample(ingredients_db['dairy'] + ingredients_db['fruits'], 2))
            elif template["category"] == "lunch":
                all_ingredients.extend(random.sample(ingredients_db['vegetables'] + ingredients_db['oils'], 2))
            elif template["category"] == "dinner":
                all_ingredients.extend(random.sample(ingredients_db['vegetables'] + ingredients_db['herbs_spices'], 3))
            else:  # dessert
                all_ingredients.extend(random.sample(ingredients_db['sweets'] + ingredients_db['dairy'], 2))

            # Remove duplicates
            all_ingredients = list(set(all_ingredients))

            # Generate description
            descriptions = [
                "Un plat simple et savoureux avec des ingrédients frais.",
                "Une recette traditionnelle revisitée avec une touche moderne.",
                "Parfait pour un repas équilibré et délicieux.",
                "Une préparation rapide et facile pour tous les jours.",
                "Un classique de la cuisine française avec une saveur unique.",
                "Idéal pour impressionner vos invités avec peu d'efforts.",
                "Une recette saine et nourrissante pour toute la famille.",
                "Découvrez cette combinaison surprenante et délicieuse."
            ]

            # Generate random rating (3.5 to 5 stars)
            rating = round(random.uniform(3.5, 5.0), 1)
            stars = "★" * int(rating) + ("☆" if rating % 1 >= 0.5 else "")

            # Select random image based on category
            image_urls = {
                "breakfast": [
                    "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=400&q=80"
                ],
                "lunch": [
                    "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80"
                ],
                "dinner": [
                    "https://images.unsplash.com/photo-1532636875304-0c89119d9b4e?auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=400&q=80"
                ],
                "dessert": [
                    "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80",
                    "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80"
                ]
            }

            recipe = {
                "id": recipe_id,
                "name": recipe_name,
                "ingredients": all_ingredients,
                "description": random.choice(descriptions),
                "image": random.choice(image_urls[template["category"]]),
                "category": template["category"],
                "time": template["time"],
                "difficulty": template["difficulty"],
                "rating": stars,
                "keywords": all_ingredients + [template["category"], template["difficulty"].lower()]
            }

            recipes.append(recipe)
            recipe_id += 1

    return recipes

# Generate and save recipes
if __name__ == "__main__":
    print("Génération de la base de données de recettes...")
    recipes = generate_recipes()

    # Save to JSON file
    with open('recipes_database.json', 'w', encoding='utf-8') as f:
        json.dump(recipes, f, ensure_ascii=False, indent=2)

    print(f"Base de données créée avec {len(recipes)} recettes!")
    print("Fichier sauvegardé: recipes_database.json")

    # Print some statistics
    categories = {}
    for recipe in recipes:
        cat = recipe['category']
        categories[cat] = categories.get(cat, 0) + 1

    print("\nStatistiques par catégorie:")
    for cat, count in categories.items():
        print(f"- {cat}: {count} recettes")