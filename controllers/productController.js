import {
  getAllCategories,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} from "../db/queries.js";
import { validationResult, matchedData } from "express-validator";

async function getProductForm(req, res) {
  const categories = await getAllCategories();

  if (req.originalUrl === "/products/new") {
    // use absolute link URL
    return res.render("forms/product", {
      title: "New Product",
      formTitle: "Add New Product",
      actionRoute: "/products/new",
      submitText: "Create Product",
      categories: categories,
      product: {},
    });
  }

  const productId = parseInt(req.params.productId);
  const product = await getProductById(productId);

  res.render("forms/product", {
    title: "Edit Product",
    formTitle: "Edit Product",
    actionRoute: `/products/${product.product_id}/edit`,
    submitText: "Save Changes",
    categories: categories,
    product: product,
  });
}

// Create a controller to create a new product
async function createProduct(req, res) {
  const categories = await getAllCategories();

  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(400).render("forms/product", {
      title: "New Product",
      formTitle: "Add New Product",
      actionRoute: "/products/new",
      submitText: "Create Product",
      categories: categories,
      product: {},
      errors: errors.array(),
    });
  }

  // Get user selected option, which requires NO validation
  const { categoryName } = req.body;
  const category = categories.find((c) => c.name === categoryName);
  const categoryId = category.category_id;

  // Get datatthat require validation
  const { productName, description } = matchedData(req);

  await insertProduct(productName, description, categoryId);

  res.redirect("/");
}

// Create controller to update a product
async function reviseProduct(req, res) {
  const productId = parseInt(req.params.productId);
  const product = await getProductById(productId);

  const categories = await getAllCategories();

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("forms/product", {
      title: "Edit Product",
      formTitle: "Edit Product",
      actionRoute: `/products/${product.product_id}/edit`,
      submitText: "Save Changes",
      categories: categories,
      product: product,
    });
  }

  const { categoryName } = req.body;
  const category = categories.find((c) => c.name === categoryName);
  const categoryId = category.category_id;

  const { productName, description } = matchedData(req);

  const previousData = {
    product_name: product.product_name,
    description: product.description,
  };

  await updateProduct(
    productId,
    productName || previousData.product_name,
    description || previousData.description,
    categoryId,
  );

  res.redirect("/");
}

export { getProductForm, createProduct, reviseProduct };
