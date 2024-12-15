document.addEventListener("DOMContentLoaded", () => {
  let products = [];

  fetch("../coffee-house/scripts/products.json")
    .then(response => response.json())
    .then(data => {
      products = data;
      initializeCardClickListeners(products);
    })
    .catch(error => {
      console.error("Error fetching JSON:", error);
    });

  function initializeCardClickListeners(products) {
    const body = document.querySelector("body");
    const pop_up = document.querySelector(".pop-up");
    const cards = document.querySelectorAll(".menu-item");
    const close_button = document.querySelector(".close-button");
    const pop_up_text = document.querySelector(".pop-up-text");
    const product_image = document.querySelector(".product-image");
    const price_items = document.querySelectorAll(".pop-up-text input");
    const size_items = document.querySelectorAll(".size-input");
    const additives_items = document.querySelectorAll(".additives-input");
    const total_price = document.getElementById("total-price");

    function generalToggle() {
      pop_up.classList.toggle("open");
      body.classList.toggle("lock");
    }

    pop_up.addEventListener("click", function(event) {
      if (!event.target.closest(".pop-up-content") || event.target === close_button) {
        generalToggle();
      }
    });

    cards.forEach((card) => {
      const product_name = card.querySelector(".product-name").innerText;

      card.addEventListener("click", function() {
        generalToggle();

        products.forEach((product) => {
          if (product.name === product_name) {
            const card_number = this.dataset.cardNumber;
            const product_category = product.category;

            if (product_category === "coffee") {
              product_image.src = `images/menu/${product_category}/${product_category}-${+card_number + 1}.png`;
            } else if (product_category === "tea") {
              product_image.src = `images/menu/${product_category}/${product_category}-${+card_number - 7}.png`;
            } else {
              product_image.src = `images/menu/${product_category}s/${product_category}-${+card_number - 11}.png`;
            }

            product_image.alt = product.name;
            product_image.title = product.name;

            pop_up_text.querySelector(".product-name").innerHTML = product.name;
            pop_up_text.querySelector(".product-description").innerHTML = product.description;

            if (product_category === "dessert") {
              pop_up_text.querySelector(".measure-s").innerHTML = "50 g";
              pop_up_text.querySelector(".measure-m").innerHTML = "100 g";
              pop_up_text.querySelector(".measure-l").innerHTML = "200 g";
              pop_up_text.querySelector(".add-name-one").innerHTML = "Berries";
              pop_up_text.querySelector(".add-name-two").innerHTML = "Nuts";
              pop_up_text.querySelector(".add-name-three").innerHTML = "Jam";
            } else {
              pop_up_text.querySelector(".measure-s").innerHTML = "200 ml";
              pop_up_text.querySelector(".measure-m").innerHTML = "300 ml";
              pop_up_text.querySelector(".measure-l").innerHTML = "400 ml";
              pop_up_text.querySelector(".add-name-one").innerHTML = "Sugar";
              pop_up_text.querySelector(".add-name-three").innerHTML = "Syrup";

              product_category === "coffee" ?
              pop_up_text.querySelector(".add-name-two").innerHTML = "Cinnamon" :
              pop_up_text.querySelector(".add-name-two").innerHTML = "Lemon";
            }

            total_price.innerHTML = "$" + (+product.price).toFixed(2);

            const primary_price = +total_price.textContent.replace("$", '');

            price_items.forEach(price => price.addEventListener("change", totalPrice));

            function totalPrice() {
              let add_price = 0;

              size_items.forEach(size => countAddPrice(size));

              additives_items.forEach(additive => countAddPrice(additive));

              function countAddPrice(item) {
                const price = +item.dataset.price;
                item.checked ? add_price += price : add_price;
              }

              total_price.innerHTML = "$" + (primary_price + add_price).toFixed(2);
            }
          }
        });

        price_items.forEach(item => {
          if (item.checked) {
            item.checked = false;
          }
        });

        document.getElementById("s").checked = "checked";
      });
    });
  }
});
