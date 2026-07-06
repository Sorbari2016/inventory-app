import { getAllCategories } from "../db/queries.js";

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
    actionRoute: "/categories/:categoryId/edit",
    submitText: "Save Changes",
    category: category,
  });
}

export { getCategoryForm };
