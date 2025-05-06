CREATE DATABASE IF NOT EXISTS fooddb;
USE fooddb;

CREATE TABLE ingredients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  origin TEXT,
  safety_tips TEXT
);

CREATE TABLE recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  protein_type VARCHAR(255),
  description TEXT,
  instructions TEXT
);

CREATE TABLE recipe_ingredients (
  recipe_id INT,
  ingredient_id INT,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);
