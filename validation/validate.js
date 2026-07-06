import { body } from "express-validator";

const validateName = (fieldName, displayName) => {
  return body(fieldName)
    .trim()
    .notEmpty()
    .withMessage(`${displayName} is required!`)
    .matches(/^[A-Za-z0-9\s\-]+$/)
    .withMessage(
      `${displayName} can only contain letters, numbers, spaces, or hyphens`,
    )
    .isLength({ max: 30 })
    .withMessage(`${displayName} name shouldnt be more than 30 characters long`)
    .escape();
};

const validataCategory = () => {
  [validateName("categoryName", "Category name")];
};

const validateProduct = () => {
  return [
    validateName("productName", "Product name"),
    body("description")
      .trim()
      .isLength({ max: 200 })
      .withMessage("Product description must not exceed 200")
      .escape(),
  ];
};

export { validataCategory, validateProduct };
