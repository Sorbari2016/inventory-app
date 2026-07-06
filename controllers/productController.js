import { getAllCategories, getProductById } from "../db/queries.js";

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
    actionRoute: `/products/:${product.id}/edit`,
    submitText: "Save Changes",
    categories: categories,
    product: product,
  });
}

export { getProductForm };
