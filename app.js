const express = require("express");
const path = require("path");
const app = express();
const db = require("./db"); 

// Set up middleware
app.use(express.urlencoded({ extended: true }));  // To parse URL-encoded data
app.use(express.json());  // To parse JSON data

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "client", "pages"));

// Serve static files (e.g., stylesheets, images)
app.use(express.static(path.join(__dirname, 'client', 'pages')));
app.use('/images', express.static(path.join(__dirname, 'client', 'images')));


// Home Page Route
app.get("/", (req, res) => {
  // Example query to fetch featured recipes from the database
  db.query("SELECT * FROM recipes LIMIT 5", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching featured recipes.");
    }
    res.render("index", {
      title: "Welcome to My Recipe App", 
      recipes: results  // Pass the fetched recipes to the view
    });
  });
});



// Recipe Listing Page Route
app.get("/recipes", (req, res) => {
  // Fetch Chicken Recipes
  db.query("SELECT * FROM recipes WHERE protein_type = 'Chicken'", (err, chickenRecipes) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching chicken recipes.");
    }

    // Fetch Beef Recipes
    db.query("SELECT * FROM recipes WHERE protein_type = 'Beef'", (err, beefRecipes) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error fetching beef recipes.");
      }

      // Fetch Tofu Recipes
      db.query("SELECT * FROM recipes WHERE protein_type = 'Tofu'", (err, tofuRecipes) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error fetching tofu recipes.");
        }

        // Fetch Grain Recipes
        db.query("SELECT * FROM recipes WHERE protein_type = 'Grains'", (err, grainRecipes) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Error fetching grain recipes.");
          }

          // Render the recipes page and pass the recipe data to the view
          res.render("recipeList", {
            chickenRecipes: chickenRecipes,
            beefRecipes: beefRecipes,
            tofuRecipes: tofuRecipes,
            grainRecipes: grainRecipes
          });
        });
      });
    });
  });
});


// Recipe Detail Page Route
app.get("/recipe/:id", (req, res) => {
  const recipeId = req.params.id;

  // Fetch recipe details
  db.query("SELECT * FROM recipes WHERE id = ?", [recipeId], (err, recipeResults) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching recipe details.");
    }
    
    if (recipeResults.length === 0) {
      return res.status(404).send("Recipe not found.");
    }

    const recipe = recipeResults[0];

    // Fetch associated ingredients for the recipe
    db.query("SELECT ingredients.id, ingredients.name, ingredients.origin, ingredients.safety_tips FROM ingredients JOIN recipe_ingredients ON ingredients.id = recipe_ingredients.ingredient_id WHERE recipe_ingredients.recipe_id = ?", [recipeId], (err, ingredientResults) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error fetching ingredients.");
      }

      res.render("recipeDetail", {
        title: recipe.name, // Page title is the recipe name
        recipe: recipe,
        ingredients: ingredientResults // Pass ingredients to the view
      });
    });
  });
});

// Add Recipe Page Route
app.get("/add-recipe", (req, res) => {
    // Fetch ingredients from the database
    db.query("SELECT * FROM ingredients", (err, ingredientResults) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error fetching ingredients.");
      }
      res.render("recipeAdd", {
        title: "Add a New Recipe",
        ingredients: ingredientResults // Pass ingredients to the view
      });
    });
  });
  
  // Handle Add Recipe Form Submission
 app.post("/add-recipe", (req, res) => {
  let { name, protein_type, description, instructions, ingredients } = req.body;

  // Normalize ingredients to an array
  if (!Array.isArray(ingredients)) {
    ingredients = ingredients ? [ingredients] : []; // Wrap single value or set to empty array
  }

  const recipeQuery = "INSERT INTO recipes (name, protein_type, description, instructions) VALUES (?, ?, ?, ?)";
  db.query(recipeQuery, [name, protein_type, description, instructions], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error adding the recipe.");
    }

    const recipeId = result.insertId;

    // Insert ingredients into the recipe_ingredients table
    ingredients.forEach(ingredientId => {
      const ingredientQuery = "INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (?, ?)";
      db.query(ingredientQuery, [recipeId, ingredientId], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error adding ingredients.");
        }
      });
    });

    res.redirect("/recipes");
  });
});
 

// Start the server
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
