// Add event listeners to the delete category forms

const deleteForms = [
  ...document.querySelectorAll('form[action^="/categories"]'),
];

deleteForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    // prevent form from submiting
    e.preventDefault();

    // Create a confirmation alert
    const confirmed = confirm("'Delete this category and all its products?'");

    // Submit form manually, if confirmed
    if (confirmed) {
      form.submit();
    }
  });
});
