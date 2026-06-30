import {
  getAllCategories,
  getAllProducts,
  deleteCategory,
  deleteProduct,
  getProductsByCategory,
  insertCategory,
  insertProduct,
} from "../db/queries.js";

async function getHomepage(req, res) {
  try {
    const categories = await getAllCategories();
    const products = await getAllProducts();
    console.log(products);
    res.render("index", {
      title: "Homepage",
      categories: categories,
      products: products,
    });
  } catch (error) {
    console.error("Query error", error);
  }
}
export { getHomepage };
