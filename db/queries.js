import pool from "./pool.js";
import { CustomNotFoundError } from "../errors/customNotFoundError.js";

// Create method to get all product categories
async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories ORDER BY name;");
  return rows;
}

// Create method to get all products
async function getAllProducts() {
  const { rows } = await pool.query("SELECT * FROM products");
  return rows;
}

// Create method to get all the products of a category
async function getProductsByCategory(categoryName) {
  const { rows } = await pool.query(
    `SELECT *
    FROM products
    WHERE category_id = (
        SELECT category_id
        FROM categories 
        WHERE name = $1
    )`,
    [categoryName],
  );
  return rows;
}

// Create method to add a new category
async function insertCategory(category) {
  await pool.query("INSERT INTO categories (name) VALUES ($1)", [category]);
}

// Create a method add a new product
async function insertProduct(categoryName, productName, description) {
  await pool.query(
    `INSERT INTO products (product_name, description, category_id)
     SELECT $1, $2, category_id 
     FROM categories
     WHERE name = $3
    `,
    [productName, description, categoryName],
  );
}

// Create method to delete a category, when we delete a category, all its products should be deleted as well
async function deleteCategory(categoryId) {
  await pool.query("DELETE FROM categories WHERE category_id = $1", [
    categoryId,
  ]);
}

// Create a method to delete a product
async function deleteProduct(productId) {
  await pool.query("DELETE FROM products WHERE product_id = $1", [productId]);
}

export {
  getAllCategories,
  getAllProducts,
  deleteCategory,
  deleteProduct,
  getProductsByCategory,
  insertCategory,
  insertProduct,
};
