INSERT INTO ingredients (name, origin, safety_tips) VALUES
('Chicken', 'Everywhere, probably a farm with questionable morals', 'Ensure chicken is cooked to 165°F (74°C).'),
('Beef', 'Everywhere, in minecraft they can be seen on grassland', 'Cook beef to the desired doneness or suffer illness.'),
('Tofu', 'China', 'Store tofu in water and keep refrigerated or not sometimes you can just leave it in the pantry sealed.'),
('Garlic', 'Central Asia', 'Garlic can cause allergic reactions for some people. This could be a boon.'),
('Potato', 'Originated in the Andes of South America', 'Store in a cool, dark place. Avoid eating green potatoes as they can be toxic and in minecraft you get poisoned.'),
('Carrot', 'Native to Persia (modern-day Iran and Afghanistan)', 'Carrots are generally safe to eat raw or cooked. May or may not improve eyesight'),
('Onion', 'Central Asia', 'Onions can cause digestive issues for some people also uncontrollable tears. Cooking helps reduce this.'),
('Soy Sauce', 'China', 'High in sodium. Use in moderation for flavoring or not. I can not control you');


INSERT INTO recipes (name, protein_type, description, instructions) VALUES
('Garlic Chicken Stir Fry', 'Chicken', 'A quick and easy stir fry with chicken and vegetables.', '1. Cook chicken slices in a hot pan. 2. Add garlic and vegetables. 3. Stir fry and serve.'),
('Beef Stew', 'Beef', 'A beef stew with potatoes and carrots.', '1. Brown beef in a pot. 2. Add broth, potatoes, and carrots. 3. Simmer for 2 hours.'),
('Tofu Stir Fry', 'Tofu', 'A healthy tofu stir fry with a soy sauce glaze.', '1. Cook tofu until crispy. 2. Add vegetables and soy sauce. 3. Stir fry and serve.');


-- For Garlic Chicken Stir Fry (ID = 1)
INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES
(1, 1), -- Chicken
(1, 4); -- Garlic

-- For Beef Stew (ID = 2)
INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES
(2, 2), -- Beef
(2, 5), -- Potato
(2, 6), -- Carrot
(2, 4); -- Garlic

-- For Tofu Stir Fry (ID = 3)
INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES
(3, 3), -- Tofu
(3, 4); -- Garlic



SELECT * FROM ingredients;
SELECT * FROM recipes;
SELECT * FROM recipe_ingredients;
