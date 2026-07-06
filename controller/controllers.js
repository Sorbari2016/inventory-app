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
    formTitle: "Edit Product",
    actionRoute: `/products/:${product.id}/edit`,
    submitText: "Save Changes",
    categories: categories,
    product: product,
  });
}

export { getHomepage, getProductForm };
