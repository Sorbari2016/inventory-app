import { getAllCategories, getAllProducts } from "../db/queries.js";

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

export { getHomepage };
