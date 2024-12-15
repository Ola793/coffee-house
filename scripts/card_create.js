document.addEventListener("DOMContentLoaded", () => {
  let products = [];

  const basePath = window.location.hostname === "localhost"
    ? "../scripts/products.json"
    : "./scripts/products.json";

  fetch(basePath)
    .then(response => response.json())
    .then(data => {
      products = data;
      createCard();
    })
    .catch(error => console.error("Error fetching JSON:", error));

  const tabs = document.querySelectorAll(".tabs-item");
  const menu_categories = document.querySelectorAll(".menu-category");

  const x = window.matchMedia("(max-width: 768px)");

  tabs.forEach(tab => tab.addEventListener("click", function() {
    const category = this.dataset.tab;
    const menu = document.querySelector(`.${category}-menu`);

    menu_categories.forEach(category => category.classList.remove("active"));
    menu.classList.add("active");
  }));

  window.addEventListener("resize", () => {
    menu_categories.forEach(menu_category => {
      if (!x.matches && menu_category.classList.contains("loaded")) {
        menu_category.classList.remove("loaded");
      }
    });
  });

  function createCard() {
    const coffee = document.querySelector(".coffee-menu");
    const tea = document.querySelector(".tea-menu");
    const desserts = document.querySelector(".desserts-menu");

    products.forEach((product, index) => {
      const card = newElement("div", "menu-item");
      card.dataset.cardNumber = index;
      const photo = newElement("div", "photo");
      const description = newElement("div", "description");
      const title = newElement("div", "title");

      const name = newElement("h4", "product-name", product.name);
      const product_description = newElement("p", "product-description", product.description);
      const price = newElement("div", "price", "$" + product.price);

      card.append(photo, description);
      description.append(title, price);
      title.append(name, product_description);

      if (product.category === "coffee") {
        coffee.append(card);
      } else if (product.category === "tea") {
        tea.append(card);
      } else {
        desserts.append(card);
      }
    });

    coffee.append(createLoadButton());
    desserts.append(createLoadButton());

    function createLoadButton() {
      const load_button = newElement("div", "load-button");
      const load_img = newElement("img", "load-button-image");
      load_img.alt = "load-button";
      load_img.src = "images/svg/load.svg";
      load_button.append(load_img);

      load_button.addEventListener("click", function() {
        const menu_category = this.closest(".menu-category");
        menu_category.classList.add("loaded");
      });

      return load_button;
    }

    function newElement(tagName, className, text = "") {
      const element = document.createElement(`${tagName}`);
      element.classList.add(`${className}`);
      element.innerHTML = text;
      return element;
    }
  }
});
