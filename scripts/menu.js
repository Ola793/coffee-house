import products from "./products.json" assert { type: "json" };

cardInit();

const tabs_item = document.querySelectorAll(".tabs-item");
const menu_item = document.querySelectorAll(".menu-item");
const load = document.querySelectorAll(".show-more-button");


load.forEach(item => item.addEventListener("click", loadMenu));

tabs_item.forEach(tab => tab.addEventListener("click", tabs));

menu_item.forEach(item => item.addEventListener("click", modal));

function cardInit() {
  const coffee = document.querySelector(".coffee-menu");
  const tea = document.querySelector(".tea-menu");
  const desserts = document.querySelector(".desserts-menu");

  products.forEach((product, index) => {
    const card = newElement("div", "menu-item");
    card.dataset.cardNumber = index;
    const photo = newElement("div", "photo");
    const description = newElement("div", "description");
    const title = newElement("div", "title");

    const name = newElement("h3", "product-name", product.name);
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

  coffee.append(createLoad());
  desserts.append(createLoad());

  function newElement(tag, tagClass, text = '') {
    const element = document.createElement(`${tag}`);
    element.classList.add(`${tagClass}`);
    element.innerHTML = text;
    return element;
  }

  function createLoad() {
    const load_box = document.createElement('li');
    const load_img = document.createElement('img');
    load_box.classList.add('menu__load-box');
    load_img.classList.add('menu__load');
    load_img.alt = 'load';
    load_img.src = "images/svg/load.svg";
    load_box.append(load_img);
    return load_box;
  }
}

function loadMenu() {
  const menu_item = this.closest('.menu__item');
  menu_item.classList.remove('menu__item--unload');
}

function tabs() {
  const category = this.dataset.tab;
  const menu = document.querySelector(`.${category}-menu`);
  const menu_categories = document.querySelectorAll(".menu-category");
  menu_categories.forEach(category => category.classList.remove("active"));
  menu.classList.add("active");
}

function modal() {
  const index = this.dataset.cardNumber;
  const modal = document.getElementById('modal');
  const size_item = document.querySelectorAll('[data-size]');
  const additives_item = document.querySelectorAll('[data-additives]')
  const price_item = document.querySelectorAll('.modal__input');
  const total_price = document.querySelector('.modal__total-title span');
  const price_original = Number(total_price.textContent.replace('$', ''));

  price_item.forEach(item => item.addEventListener('change', price));
  modal.classList.remove('modal__deactive');
  modal.addEventListener('click', close);
  changevalue(index);
  scrollOff();

  function close(event) {
    const button_close = document.querySelector('.modal__btn');
    if (event.target === modal || event.target === button_close) {
      additives_item.forEach(item => item.checked = false);
      size_item[0].checked = true;
      modal.classList.add('modal__deactive');
      setTimeout(scrollOn, 100);
    }
  }

  function price() {
    let size_price = 0;
    let additives_price = 0;

    size_item.forEach(item => {
      const price = Number(products[index].sizes[item.dataset.size]["add-price"]);
      item.checked ? size_price += price : size_price;
    });

    additives_item.forEach(item => {
      const price = Number(products[index].additives[item.dataset.additives]["add-price"]);
      item.checked ? additives_price += price : additives_price;
    });

    total_price.innerHTML = (price_original + size_price + additives_price).toFixed(2) + "$";
  }

  function changevalue() {
    total_price.innerHTML = products[index].price + "$";
    document.querySelector(".modal__product img").src = products[index].path;
    document.getElementById("source-1").srcset = products[index].path.replace("jpg", "avif");
    document.getElementById("source-2").srcset = products[index].path.replace("jpg", "webp");
    document.querySelector(".modal__title").innerHTML = products[index].name;
    document.querySelector(".modal__description").innerHTML = products[index].description;
    document.querySelector("[data-size='s']").innerHTML = products[index].sizes.s.size;
    document.querySelector("[data-size='m']").innerHTML = products[index].sizes.m.size;
    document.querySelector("[data-size='l']").innerHTML = products[index].sizes.l.size;
    document.querySelector("[data-additives='0']").innerHTML = products[index].additives[0].name;
    document.querySelector("[data-additives='1']").innerHTML = products[index].additives[1].name;
    document.querySelector("[data-additives='2']").innerHTML = products[index].additives[2].name;
  }
}

function scrollOn() {
  document.body.style.cssText = ``;
  document.documentElement.style.scrollBehavior = '';
}

function scrollOff() {
  scroll.position = window.scrollY;

  document.body.style.cssText = `
    overflow: hidden;
    padding-right: ${window.innerWidth - document.body.offsetWidth}px;
    height: 100vh;
    width: 100vw;
  `;
  document.documentElement.style.scrollBehavior = "unset";
}
