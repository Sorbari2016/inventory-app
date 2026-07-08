import {
  getAllCategories,
  insertCategory,
  updateCategory,
  deleteCategory,
} from "../db/queries.js";
import { validationResult, matchedData } from "express-validator";

// Create method to get the categories edit or add form
async function getCategoryForm(req, res) {
  const categories = await getAllCategories();

  if (req.originalUrl === "/categories/new") {
    return res.render("forms/category", {
      title: "New Category Page",
      formTitle: "Add New Category",
      actionRoute: "/categories/new",
      submitText: "Create Category",
      categories: categories,
    });
  }

  const categoryId = parseInt(req.params.categoryId);
  const category = categories.find(
    (category) => category.category_id === categoryId,
  );

  res.render("forms/category", {
    title: "Edit Category page",
    formTitle: "Edit Category",
    actionRoute: `/categories/${category.category_id}/edit`,
    submitText: "Save Changes",
    category: category,
  });
}

async function createCategory(req, res) {
  const categories = await getAllCategories();

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("forms/category", {
      title: "New Category Page",
      formTitle: "Add New Category",
      actionRoute: "/categories/new",
      submitText: "Create Category",
      categories: categories,
      errors: errors.array(),
    });
  }

  const { categoryName } = matchedData(req);

  await insertCategory(categoryName);

  res.redirect("/");
}

// Create a method to update a category
async function reviseCategory(req, res) {
  const categories = await getAllCategories();

  const categoryId = parseInt(req.params.categoryId);
  const category = categories.find(
    (category) => category.category_id === categoryId,
  );

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render("forms/category", {
      title: "Edit Category page",
      formTitle: "Edit Category",
      actionRoute: `/categories/${category.category_id}/edit`,
      submitText: "Save Changes",
      category: category,
      errors: errors.array(),
    });
  }

  const { categoryName } = matchedData(req);

  await updateCategory(categoryId, categoryName || category.name);

  res.redirect("/");
}

// Create method to delete a category
async function removeCategory(req, res) {
  const categoryId = parseInt(req.params.categoryId);

  await deleteCategory(categoryId);

  res.redirect("/");
}

export { getCategoryForm, createCategory, reviseCategory, removeCategory };
