document.addEventListener("DOMContentLoaded", () => {
  const ingredients = document.querySelectorAll(".ingredient");

  ingredients.forEach((ingredient) => {
    const hoverInfo = ingredient.querySelector(".hover-info");

    ingredient.addEventListener("mouseover", () => {
      hoverInfo.style.display = "block";
    });

    ingredient.addEventListener("mouseout", () => {
      hoverInfo.style.display = "none";
    });
  });
});
