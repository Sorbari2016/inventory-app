import {
  getAllCategories,
  getAllProducts,
  deleteCategory,
  deleteProduct,
  getProductsByCategory,
  insertCategory,
  insertProduct,
  getProductById,
} from "../db/queries.js";

async function getHomepage(req, res) {
  try {
    const categories = await getAllCategories();
    const products = await getAllProducts();
    res.render("index", {
      title: "Homepage",
      categories: categories,
      products: products,
    });
  } catch (error) {
    console.error("Query error", error);
  }
}

async function getProductForm(req, res) {
  const categories = await getAllCategories();

  if (req.path === "/products/new") {
    return res.render("forms/product", {
      title: "New Product",
      formTitle: "Add New Product",
      actionRoute: "/products/new",
      submitText: "Create Product",
      categories: categories,
      product: "",
    });
  }

  const productId = parseInt(req.params.productId);
  const product = await getProductById(productId);

  console.log(product);

  res.render("forms/product", {
    title: "Edit Product",
    formTitle: "Edit Product",
    actionRoute: `/products/:${product.id}/edit`,
    submitText: "Save Changes",
    categories: categories,
    product: product,
  });
}

// Create method to get the categories edit or add form
async function getCategoryForm(req, res) {
  const categories = await getAllCategories();

  if (req.path === "/categories/new") {
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
    actionRoute: "/categories/:categoryId/edit",
    submitText: "Save Changes",
    category: category,
  });
}

export { getHomepage, getProductForm, getCategoryForm };
